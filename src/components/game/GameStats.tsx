import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Zap, Award } from 'lucide-react';
import { GameStats as IGameStats } from '../../types';

interface GameStatsProps {
  stats: IGameStats;
  isVisible: boolean;
  onClose: () => void;
}

export const GameStats: React.FC<GameStatsProps> = ({ stats, isVisible, onClose }) => {
  if (!isVisible) return null;

  const winRate = stats.totalGames > 0 ? Math.round((stats.wins / stats.totalGames) * 100) : 0;

  const statItems = [
    { label: 'Total Games', value: stats.totalGames, icon: Target, color: 'text-blue-500' },
    { label: 'Wins', value: stats.wins, icon: Trophy, color: 'text-green-500' },
    { label: 'Losses', value: stats.losses, icon: Zap, color: 'text-red-500' },
    { label: 'Draws', value: stats.draws, icon: Award, color: 'text-yellow-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Game Statistics
          </h2>
          <div className="text-4xl font-bold text-purple-500 mb-1">
            {winRate}%
          </div>
          <p className="text-gray-600 dark:text-gray-400">Win Rate</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {statItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center"
            >
              <item.icon className={`w-6 h-6 ${item.color} mx-auto mb-2`} />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {item.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};