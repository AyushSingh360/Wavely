import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreVertical, Phone, Video, Info, PhoneCall, VideoIcon } from 'lucide-react';
import { Chat, User, CallState } from '../../types';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { CallInterface } from './CallInterface';

interface ChatWindowProps {
  chat: Chat;
  currentUser: User;
  onSendMessage: (message: string, type?: 'text' | 'secret') => void;
  onGameInvite?: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  chat,
  currentUser,
  onSendMessage,
  onGameInvite
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const otherUser = chat.participants.find(p => p.id !== currentUser.id);
  const [callState, setCallState] = useState<CallState | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);

  const handleSecretMessageView = (messageId: string) => {
    // Handle secret message viewing logic
    console.log('Secret message viewed:', messageId);
  };

  const startCall = (type: 'voice' | 'video') => {
    if (!otherUser) return;
    
    setCallState({
      isActive: true,
      type,
      participant: otherUser,
      duration: 0,
      status: 'connecting'
    });

    // Simulate connection
    setTimeout(() => {
      setCallState(prev => prev ? { ...prev, status: 'connected' } : null);
    }, 2000);
  };

  const endCall = () => {
    setCallState(prev => prev ? { ...prev, status: 'ended' } : null);
    setTimeout(() => setCallState(null), 1000);
  };

  if (!otherUser) return null;

  return (
    <>
      <div className="flex-1 flex flex-col h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={otherUser.avatar}
                  alt={otherUser.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {otherUser.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {otherUser.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {otherUser.isOnline ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <motion.button
                onClick={() => startCall('voice')}
                className="p-2 text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-200 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Phone className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={() => startCall('video')}
                className="p-2 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Video className="w-5 h-5" />
              </motion.button>
              <motion.button
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Info className="w-5 h-5" />
              </motion.button>
              <motion.button
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <MoreVertical className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {chat.messages.map((message, index) => {
            const isOwn = message.senderId === currentUser.id;
            const showAvatar = !isOwn && (index === 0 || chat.messages[index - 1].senderId !== message.senderId);
            
            return (
              <MessageBubble
                key={message.id}
                message={message}
                isOwn={isOwn}
                currentUser={currentUser}
                showAvatar={showAvatar}
                onSecretMessageView={handleSecretMessageView}
              />
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <MessageInput
          onSendMessage={onSendMessage}
          onGameInvite={onGameInvite}
        />
      </div>

      {/* Call Interface */}
      <AnimatePresence>
        {callState && (
          <CallInterface
            callState={callState}
            onEndCall={endCall}
          />
        )}
      </AnimatePresence>
    </>
  );
};