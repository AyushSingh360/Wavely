import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Settings, BarChart3, Waves } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { GameStats } from '../game/GameStats';
import { GameStats as IGameStats } from '../../types';

interface HeaderProps {
  gameStats: IGameStats;
}

export const Header: React.FC<HeaderProps> = ({ gameStats }) => {
  const [showStats, setShowStats] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  repeatDelay: 2 
                }}
              >
                <Waves className="w-8 h-8 text-blue-500" />
              </motion.div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 bg-clip-text text-transparent">
                Wavely
              </h1>
            </motion.div>
            <div className="hidden sm:block">
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                AI-Powered Messaging
              </span>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <motion.button
              onClick={() => setShowStats(true)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <BarChart3 className="w-5 h-5" />
            </motion.button>

            <motion.button
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Settings className="w-5 h-5" />
            </motion.button>

            <ThemeToggle />
          </div>
        </div>
      </motion.header>

      <GameStats
        stats={gameStats}
        isVisible={showStats}
        onClose={() => setShowStats(false)}
      />
    </>
  );
};