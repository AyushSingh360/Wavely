import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { Check, CheckCheck } from 'lucide-react';
import { Chat, User } from '../../types';

interface ChatListProps {
  chats: Chat[];
  activeChat: string | null;
  onChatSelect: (chatId: string) => void;
  currentUser: User;
}

export const ChatList: React.FC<ChatListProps> = ({
  chats,
  activeChat,
  onChatSelect,
  currentUser
}) => {
  return (
    <div className="w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Messages</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat, index) => {
          const otherUser = chat.participants.find(p => p.id !== currentUser.id);
          const lastMessage = chat.messages[chat.messages.length - 1];
          const isActive = chat.id === activeChat;
          
          return (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                p-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer
                transition-colors duration-200
                ${isActive 
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-r-2 border-r-blue-500' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                }
              `}
              onClick={() => onChatSelect(chat.id)}
              whileHover={{ x: 4 }}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={otherUser?.avatar}
                    alt={otherUser?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {otherUser?.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 dark:text-white truncate">
                      {otherUser?.name}
                    </h3>
                    {lastMessage && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDistanceToNow(lastMessage.timestamp, { addSuffix: true })}
                      </span>
                    )}
                  </div>
                  
                  {lastMessage && (
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center space-x-1 min-w-0">
                        {lastMessage.senderId === currentUser.id && (
                          <div className="text-gray-400 dark:text-gray-500">
                            {lastMessage.status === 'sent' && <Check className="w-3 h-3" />}
                            {lastMessage.status === 'delivered' && <CheckCheck className="w-3 h-3" />}
                            {lastMessage.status === 'read' && <CheckCheck className="w-3 h-3 text-blue-500" />}
                          </div>
                        )}
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {lastMessage.content}
                        </p>
                      </div>
                      
                      {chat.unreadCount > 0 && (
                        <span className="ml-2 px-2 py-1 bg-blue-500 text-white text-xs rounded-full min-w-[20px] text-center">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                  )}
                  
                  {otherUser?.isTyping && (
                    <div className="flex items-center mt-1">
                      <div className="flex space-x-1">
                        <motion.div
                          className="w-1 h-1 bg-blue-500 rounded-full"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div
                          className="w-1 h-1 bg-blue-500 rounded-full"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-1 h-1 bg-blue-500 rounded-full"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                      <span className="ml-2 text-xs text-blue-500">typing...</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};