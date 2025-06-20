import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Gamepad2, Sparkles, Waves, Bot } from 'lucide-react';

export const EmptyState: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto px-6"
      >
        <motion.div
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="mb-6"
        >
          <div className="relative">
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              <Waves className="w-24 h-24 text-blue-400 mx-auto" />
            </motion.div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute -top-2 -right-2"
            >
              <Bot className="w-8 h-8 text-purple-500" />
            </motion.div>
            <motion.div
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -bottom-1 -left-1"
            >
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </motion.div>
          </div>
        </motion.div>

        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-4">
          Welcome to Wavely!
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
          Start a conversation with our AI companions! Chat naturally and challenge them to exciting games of Tic Tac Toe.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50"
          >
            <MessageCircle className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <p className="font-medium text-gray-900 dark:text-white">AI Chat</p>
            <p className="text-gray-500 dark:text-gray-400">Natural conversations with smart AI</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50"
          >
            <Gamepad2 className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <p className="font-medium text-gray-900 dark:text-white">Smart Gaming</p>
            <p className="text-gray-500 dark:text-gray-400">Challenge AI to Tic Tac Toe</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50"
          >
            <Bot className="w-6 h-6 text-teal-500 mx-auto mb-2" />
            <p className="font-medium text-gray-900 dark:text-white">AI Personalities</p>
            <p className="text-gray-500 dark:text-gray-400">Multiple AI companions to chat with</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-200/30 dark:border-blue-700/30"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">
            💡 <strong>Tip:</strong> Select a conversation to start chatting with AI or challenge them to a game!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};