import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Smile, Gamepad2, Paperclip, Flame, Timer, MessageSquare, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { savedReplies } from '../../hooks/useMessages';

interface MessageInputProps {
  onSendMessage: (message: string, type?: 'text' | 'secret') => void;
  onGameInvite?: () => void;
  disabled?: boolean;
}

const emojis = ['😀', '😍', '🎉', '👍', '❤️', '😂', '🔥', '✨'];

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  onGameInvite,
  disabled = false
}) => {
  const [message, setMessage] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const [showSecretOptions, setShowSecretOptions] = useState(false);
  const [showSavedReplies, setShowSavedReplies] = useState(false);
  const [secretDuration, setSecretDuration] = useState(30); // seconds
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent, isSecret = false) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim(), isSecret ? 'secret' : 'text');
      setMessage('');
      setShowSecretOptions(false);
      inputRef.current?.focus();
    }
  };

  const addEmoji = (emoji: string) => {
    setMessage(prev => prev + emoji);
    setShowEmojis(false);
    inputRef.current?.focus();
  };

  const sendSecretMessage = () => {
    if (message.trim()) {
      onSendMessage(message.trim(), 'secret');
      setMessage('');
      setShowSecretOptions(false);
      inputRef.current?.focus();
    }
  };

  const useSavedReply = (reply: string) => {
    setMessage(reply);
    setShowSavedReplies(false);
    inputRef.current?.focus();
  };

  const categories = ['all', ...Array.from(new Set(savedReplies.map(reply => reply.category)))];
  const filteredReplies = selectedCategory === 'all' 
    ? savedReplies 
    : savedReplies.filter(reply => reply.category === selectedCategory);

  return (
    <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <AnimatePresence>
        {showEmojis && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mb-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <div className="flex flex-wrap gap-2">
              {emojis.map((emoji, index) => (
                <motion.button
                  key={emoji}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => addEmoji(emoji)}
                  className="text-2xl hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {emoji}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {showSavedReplies && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mb-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-700"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                <h3 className="font-medium text-gray-900 dark:text-white">Saved Replies</h3>
              </div>
              <button
                onClick={() => setShowSavedReplies(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-3">
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm appearance-none cursor-pointer"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Saved Replies Grid */}
            <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
              {filteredReplies.map((reply, index) => (
                <motion.button
                  key={reply.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => useSavedReply(reply.text)}
                  className="text-left p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-900 dark:text-white">{reply.text}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                      {reply.category}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {showSecretOptions && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mb-3 p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border border-orange-200 dark:border-orange-700"
          >
            <div className="flex items-center space-x-2 mb-3">
              <Flame className="w-5 h-5 text-orange-500" />
              <h3 className="font-medium text-gray-900 dark:text-white">Secret Message</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              This message will disappear after being viewed and expire in {secretDuration} seconds.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Timer className="w-4 h-4 text-gray-500" />
                <select
                  value={secretDuration}
                  onChange={(e) => setSecretDuration(Number(e.target.value))}
                  className="text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-2 py-1"
                >
                  <option value={15}>15 seconds</option>
                  <option value={30}>30 seconds</option>
                  <option value={60}>1 minute</option>
                  <option value={300}>5 minutes</option>
                </select>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSecretOptions(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={sendSecretMessage}
                  disabled={!message.trim()}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  Send Secret
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={(e) => handleSubmit(e)} className="flex items-center space-x-2">
        <div className="flex space-x-1">
          <motion.button
            type="button"
            onClick={() => setShowSavedReplies(!showSavedReplies)}
            className="p-2 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MessageSquare className="w-5 h-5" />
          </motion.button>

          <motion.button
            type="button"
            onClick={() => setShowEmojis(!showEmojis)}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Smile className="w-5 h-5" />
          </motion.button>

          <motion.button
            type="button"
            onClick={() => setShowSecretOptions(!showSecretOptions)}
            className="p-2 text-orange-500 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Flame className="w-5 h-5" />
          </motion.button>

          <motion.button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Paperclip className="w-5 h-5" />
          </motion.button>

          {onGameInvite && (
            <motion.button
              type="button"
              onClick={onGameInvite}
              className="p-2 text-purple-500 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Gamepad2 className="w-5 h-5" />
            </motion.button>
          )}
        </div>

        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={showSecretOptions ? "Type your secret message..." : "Type a message..."}
            disabled={disabled}
            className={`w-full px-4 py-2 rounded-full focus:outline-none focus:ring-2 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
              showSecretOptions 
                ? 'bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 focus:ring-orange-500 border-2 border-orange-300 dark:border-orange-600'
                : 'bg-gray-100 dark:bg-gray-800 focus:ring-blue-500'
            }`}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={!message.trim() || disabled}
          className={`rounded-full p-2 w-10 h-10 ${
            showSecretOptions 
              ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
              : ''
          }`}
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};