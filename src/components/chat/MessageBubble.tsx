import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Check, CheckCheck, Clock, Eye, EyeOff, Timer, Flame } from 'lucide-react';
import { Message, User } from '../../types';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  currentUser: User;
  showAvatar?: boolean;
  onSecretMessageView?: (messageId: string) => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwn,
  currentUser,
  showAvatar = false,
  onSecretMessageView
}) => {
  const [isSecretRevealed, setIsSecretRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (message.type === 'secret' && message.secretData) {
      const updateTimer = () => {
        const now = new Date();
        const expiresAt = new Date(message.secretData!.expiresAt);
        const remaining = Math.max(0, Math.floor((expiresAt.getTime() - now.getTime()) / 1000));
        setTimeLeft(remaining);
        
        if (remaining === 0 && !message.secretData!.isExpired) {
          // Message expired
          message.secretData!.isExpired = true;
        }
      };

      updateTimer();
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    }
  }, [message]);

  const handleSecretMessageClick = () => {
    if (message.type === 'secret' && !isSecretRevealed && !message.secretData?.isExpired) {
      setIsSecretRevealed(true);
      if (onSecretMessageView) {
        onSecretMessageView(message.id);
      }
      
      // Auto-hide after viewing
      setTimeout(() => {
        setIsSecretRevealed(false);
      }, 10000); // Hide after 10 seconds of viewing
    }
  };

  const getStatusIcon = () => {
    switch (message.status) {
      case 'sending':
        return <Clock className="w-3 h-3 text-gray-400" />;
      case 'sent':
        return <Check className="w-3 h-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default:
        return null;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderSecretMessage = () => {
    const isExpired = message.secretData?.isExpired;
    
    if (isExpired) {
      return (
        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
          <EyeOff className="w-4 h-4" />
          <span className="text-sm italic">Secret message expired</span>
        </div>
      );
    }

    if (!isSecretRevealed) {
      return (
        <motion.div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={handleSecretMessageClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Flame className="w-4 h-4 text-orange-500" />
          </motion.div>
          <span className="text-sm font-medium">Secret message</span>
          <Eye className="w-4 h-4" />
          {timeLeft !== null && (
            <div className="flex items-center space-x-1 text-xs">
              <Timer className="w-3 h-3" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          )}
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-2"
      >
        <div className="flex items-center space-x-2 text-orange-500 text-xs">
          <Flame className="w-3 h-3" />
          <span>Secret message revealed</span>
          {timeLeft !== null && (
            <div className="flex items-center space-x-1">
              <Timer className="w-3 h-3" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          )}
        </div>
        <p className="text-sm leading-relaxed">{message.content}</p>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-end space-x-2 mb-4 ${isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}
    >
      {showAvatar && !isOwn && (
        <img
          src={currentUser.avatar}
          alt="Avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
      )}
      
      <div className={`max-w-xs lg:max-w-md ${isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
        <motion.div
          className={`
            px-4 py-2 rounded-2xl shadow-sm
            ${message.type === 'secret' 
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-2 border-orange-300'
              : isOwn 
                ? 'bg-blue-500 text-white rounded-br-md' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-md'
            }
          `}
          whileHover={{ scale: 1.02 }}
        >
          {message.type === 'secret' ? renderSecretMessage() : (
            <p className="text-sm leading-relaxed">{message.content}</p>
          )}
        </motion.div>
        
        <div className={`flex items-center space-x-1 mt-1 ${isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {format(message.timestamp, 'HH:mm')}
          </span>
          {isOwn && getStatusIcon()}
        </div>
      </div>
    </motion.div>
  );
};