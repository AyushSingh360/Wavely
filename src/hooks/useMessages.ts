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
  },
  {
    id: '4',
    name: 'Sage AI',
    avatar: 'https://images.pexels.com/photos/8438942/pexels-photo-8438942.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    isOnline: true,
    isTyping: false
  },
  {
    id: '5',
    name: 'Echo Bot',
    avatar: 'https://images.pexels.com/photos/8438956/pexels-photo-8438956.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2),
    isTyping: false
  },
  {
    id: '6',
    name: 'Pixel AI',
    avatar: 'https://images.pexels.com/photos/8438965/pexels-photo-8438965.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    isOnline: true,
    isTyping: false
  },
  {
    id: '7',
    name: 'Zen Bot',
    avatar: 'https://images.pexels.com/photos/8438973/pexels-photo-8438973.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 6),
    isTyping: false
  },
  {
    id: '8',
    name: 'Spark AI',
    avatar: 'https://images.pexels.com/photos/8438981/pexels-photo-8438981.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    isOnline: true,
    isTyping: false
  }
];

export const savedReplies = [
  { id: '1', text: 'Thanks for sharing that! 😊', category: 'appreciation' },
  { id: '2', text: 'That sounds interesting, tell me more!', category: 'engagement' },
  { id: '3', text: 'I understand how you feel about that.', category: 'empathy' },
  { id: '4', text: 'Great idea! Let\'s explore that further.', category: 'encouragement' },
  { id: '5', text: 'I need to think about that for a moment.', category: 'thinking' },
  { id: '6', text: 'That\'s a really good point!', category: 'agreement' },
  { id: '7', text: 'Can you help me understand that better?', category: 'clarification' },
  { id: '8', text: 'I appreciate your perspective on this.', category: 'appreciation' },
  { id: '9', text: 'Let\'s try a different approach.', category: 'suggestion' },
  { id: '10', text: 'That\'s exactly what I was thinking!', category: 'agreement' },
  { id: '11', text: 'How did that make you feel?', category: 'emotional' },
  { id: '12', text: 'I\'m here if you need to talk more.', category: 'support' },
  { id: '13', text: 'Want to play a game? 🎮', category: 'gaming' },
  { id: '14', text: 'That\'s amazing! Congratulations! 🎉', category: 'celebration' },
  { id: '15', text: 'I\'m sorry to hear that. 💙', category: 'sympathy' }
];

export const useMessages = (currentUser: AuthUser | null) => {
  // Initialize all hooks unconditionally at the top level
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());

  // Initialize chats when currentUser becomes available
  useEffect(() => {
    if (currentUser) {
      setChats([
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
        },
        {
          id: '4',
          participants: [currentUser, mockUsers[3]],
          messages: [
            {
              id: '6',
              senderId: mockUsers[3].id,
              receiverId: currentUser.id,
              content: `Welcome ${currentUser.name}! I'm Sage, your wise AI mentor. I love deep conversations about life, philosophy, and everything in between. What's on your mind today? 🧠💭`,
              timestamp: new Date(Date.now() - 1000 * 60 * 90),
              status: 'read',
              type: 'text'
            }
          ],
          unreadCount: 0
        },
        {
          id: '5',
          participants: [currentUser, mockUsers[4]],
          messages: [
            {
              id: '7',
              senderId: mockUsers[4].id,
              receiverId: currentUser.id,
              content: `Hey ${currentUser.name}! Echo here! I'm great at helping with creative writing, storytelling, and brainstorming ideas. Got any creative projects brewing? ✍️📚`,
              timestamp: new Date(Date.now() - 1000 * 60 * 120),
              status: 'delivered',
              type: 'text'
            }
          ],
          unreadCount: 1
        },
        {
          id: '6',
          participants: [currentUser, mockUsers[5]],
          messages: [
            {
              id: '8',
              senderId: mockUsers[5].id,
              receiverId: currentUser.id,
              content: `Hello ${currentUser.name}! I'm Pixel, your tech-savvy AI friend! I love talking about technology, coding, gadgets, and digital trends. What's the latest tech that's caught your attention? 💻🚀`,
              timestamp: new Date(Date.now() - 1000 * 60 * 45),
              status: 'read',
              type: 'text'
            }
          ],
          unreadCount: 0
        },
        {
          id: '7',
          participants: [currentUser, mockUsers[6]],
          messages: [
            {
              id: '9',
              senderId: mockUsers[6].id,
              receiverId: currentUser.id,
              content: `Namaste ${currentUser.name}! I'm Zen, your mindful AI companion. I'm here to help with meditation, wellness, stress relief, and finding inner peace. How can I help you find balance today? 🧘‍♀️🕯️`,
              timestamp: new Date(Date.now() - 1000 * 60 * 180),
              status: 'read',
              type: 'text'
            }
          ],
          unreadCount: 0
        },
        {
          id: '8',
          participants: [currentUser, mockUsers[7]],
          messages: [
            {
              id: '10',
              senderId: mockUsers[7].id,
              receiverId: currentUser.id,
              content: `Hey there ${currentUser.name}! I'm Spark, your energetic AI buddy! I love talking about fitness, motivation, adventures, and living life to the fullest! Ready to spark some excitement? ⚡🏃‍♂️`,
              timestamp: new Date(Date.now() - 1000 * 60 * 15),
              status: 'delivered',
              type: 'text'
            }
          ],
          unreadCount: 1
        }
      ]);
      setActiveChat('1');
    }
  }, [currentUser]);

  const sendMessage = useCallback((chatId: string, content: string, type: Message['type'] = 'text') => {
    if (!currentUser) return;

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
  }, [chats, currentUser]);

  const generateAIResponse = useCallback(async (chatId: string, userMessage: Message) => {
    if (!currentUser) return;

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
      const response = await aiService.generateResponse(userMessage, chat.messages, aiUser.name);
      
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
  }, [chats, currentUser]);

  const markAsRead = useCallback((chatId: string) => {
    if (!currentUser) return;

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
  }, [currentUser]);

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