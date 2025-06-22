import { useState, useCallback, useEffect } from 'react';
import { Message, Chat, User, AuthUser } from '../types';
import { aiService } from '../services/aiService';

const mockUsers: User[] = [
  {
    id: '1',
    name: 'AI Assistant',
    avatar: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    isOnline: true,
    isTyping: false
  },
  {
    id: '2',
    name: 'Luna AI',
    avatar: 'https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    isOnline: true,
    lastSeen: new Date(Date.now() - 1000 * 60 * 30),
    isTyping: false
  },
  {
    id: '3',
    name: 'Nova Bot',
    avatar: 'https://images.pexels.com/photos/8438971/pexels-photo-8438971.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    isOnline: true,
    isTyping: false
  }
];

export const useMessages = (currentUser: AuthUser) => {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      participants: [currentUser, mockUsers[0]],
      messages: [
        {
          id: '1',
          senderId: mockUsers[0].id,
          receiverId: currentUser.id,
          content: `Hello ${currentUser.name}! I'm your AI assistant. I can chat with you and even play Tic Tac Toe! What would you like to talk about? 😊`,
          timestamp: new Date(Date.now() - 1000 * 60 * 10),
          status: 'read',
          type: 'text'
        }
      ],
      unreadCount: 0
    },
    {
      id: '2',
      participants: [currentUser, mockUsers[1]],
      messages: [
        {
          id: '4',
          senderId: mockUsers[1].id,
          receiverId: currentUser.id,
          content: `Hi there ${currentUser.name}! I'm Luna, your creative AI companion. Ready for some fun conversations and games? 🌙✨`,
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          status: 'delivered',
          type: 'text'
        }
      ],
      unreadCount: 1
    },
    {
      id: '3',
      participants: [currentUser, mockUsers[2]],
      messages: [
        {
          id: '5',
          senderId: mockUsers[2].id,
          receiverId: currentUser.id,
          content: `Greetings ${currentUser.name}! I'm Nova, your strategic gaming AI. Want to challenge me to a game of Tic Tac Toe? I promise to make it interesting! 🎮`,
          timestamp: new Date(Date.now() - 1000 * 60 * 60),
          status: 'read',
          type: 'text'
        }
      ],
      unreadCount: 0
    }
  ]);

  const [activeChat, setActiveChat] = useState<string | null>('1');
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());

  const sendMessage = useCallback((chatId: string, content: string, type: Message['type'] = 'text') => {
    const chat = chats.find(c => c.id === chatId);
    if (!chat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      receiverId: chat.participants.find(p => p.id !== currentUser.id)?.id || '',
      content,
      timestamp: new Date(),
      status: 'sending',
      type
    };

    // Add secret message data if it's a secret message
    if (type === 'secret') {
      newMessage.secretData = {
        expiresAt: new Date(Date.now() + 30 * 1000), // 30 seconds from now
        isExpired: false,
        viewedBy: []
      };
    }

    setChats(prev => prev.map(c => {
      if (c.id === chatId) {
        return {
          ...c,
          messages: [...c.messages, newMessage]
        };
      }
      return c;
    }));

    // Simulate message status updates
    setTimeout(() => {
      setChats(prev => prev.map(c => {
        if (c.id === chatId) {
          return {
            ...c,
            messages: c.messages.map(msg => 
              msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
            )
          };
        }
        return c;
      }));
    }, 500);

    setTimeout(() => {
      setChats(prev => prev.map(c => {
        if (c.id === chatId) {
          return {
            ...c,
            messages: c.messages.map(msg => 
              msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
            )
          };
        }
        return c;
      }));
    }, 1000);

    // Trigger AI response (but not for secret messages to maintain privacy)
    if (type !== 'game-invite' && type !== 'secret') {
      generateAIResponse(chatId, newMessage);
    }
  }, [chats, currentUser.id]);

  const generateAIResponse = useCallback(async (chatId: string, userMessage: Message) => {
    const chat = chats.find(c => c.id === chatId);
    if (!chat) return;

    const aiUser = chat.participants.find(p => p.id !== currentUser.id);
    if (!aiUser) return;

    // Show typing indicator
    setTypingUsers(prev => new Set(prev).add(aiUser.id));
    setChats(prev => prev.map(c => {
      if (c.id === chatId) {
        return {
          ...c,
          participants: c.participants.map(p => 
            p.id === aiUser.id ? { ...p, isTyping: true } : p
          )
        };
      }
      return c;
    }));

    try {
      const response = await aiService.generateResponse(userMessage, chat.messages);
      
      // Remove typing indicator
      setTypingUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(aiUser.id);
        return newSet;
      });

      setChats(prev => prev.map(c => {
        if (c.id === chatId) {
          return {
            ...c,
            participants: c.participants.map(p => 
              p.id === aiUser.id ? { ...p, isTyping: false } : p
            )
          };
        }
        return c;
      }));

      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        senderId: aiUser.id,
        receiverId: currentUser.id,
        content: response.content,
        timestamp: new Date(),
        status: 'sent',
        type: response.type
      };

      setChats(prev => prev.map(c => {
        if (c.id === chatId) {
          return {
            ...c,
            messages: [...c.messages, aiMessage]
          };
        }
        return c;
      }));

      // Mark as read after a short delay
      setTimeout(() => {
        setChats(prev => prev.map(c => {
          if (c.id === chatId) {
            return {
              ...c,
              messages: c.messages.map(msg => 
                msg.id === aiMessage.id ? { ...msg, status: 'read' } : msg
              )
            };
          }
          return c;
        }));
      }, 1500);

    } catch (error) {
      console.error('Error generating AI response:', error);
      
      // Remove typing indicator on error
      setTypingUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(aiUser.id);
        return newSet;
      });

      setChats(prev => prev.map(c => {
        if (c.id === chatId) {
          return {
            ...c,
            participants: c.participants.map(p => 
              p.id === aiUser.id ? { ...p, isTyping: false } : p
            )
          };
        }
        return c;
      }));
    }
  }, [chats, currentUser.id]);

  const markAsRead = useCallback((chatId: string) => {
    setChats(prev => prev.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          unreadCount: 0,
          messages: chat.messages.map(msg => 
            msg.receiverId === currentUser.id ? { ...msg, status: 'read' } : msg
          )
        };
      }
      return chat;
    }));
  }, [currentUser.id]);

  // Clean up expired secret messages
  useEffect(() => {
    const interval = setInterval(() => {
      setChats(prev => prev.map(chat => ({
        ...chat,
        messages: chat.messages.map(msg => {
          if (msg.type === 'secret' && msg.secretData && !msg.secretData.isExpired) {
            const now = new Date();
            const expiresAt = new Date(msg.secretData.expiresAt);
            if (now >= expiresAt) {
              return {
                ...msg,
                secretData: {
                  ...msg.secretData,
                  isExpired: true
                }
              };
            }
          }
          return msg;
        })
      })));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    chats,
    activeChat,
    setActiveChat,
    sendMessage,
    markAsRead,
    users: mockUsers,
    generateAIResponse
  };
};