import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        relative w-12 h-6 rounded-full p-1 transition-colors duration-300
        ${isDark ? 'bg-purple-600' : 'bg-blue-500'}
      `}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="w-4 h-4 rounded-full bg-white flex items-center justify-center"
        animate={{
          x: isDark ? 24 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        {isDark ? (
          <Moon className="w-2.5 h-2.5 text-purple-600" />
        ) : (
          <Sun className="w-2.5 h-2.5 text-blue-500" />
        )}
      </motion.div>
    </motion.button>
  );
};