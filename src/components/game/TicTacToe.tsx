import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Circle, RotateCcw, Trophy, Gamepad2, Bot } from 'lucide-react';
import { GameState } from '../../types';
import { Button } from '../ui/Button';

interface TicTacToeProps {
  game: GameState;
  currentUserId: string;
  onMove: (position: number) => void;
  onReset: () => void;
  onEndGame: () => void;
}

export const TicTacToe: React.FC<TicTacToeProps> = ({
  game,
  currentUserId,
  onMove,
  onReset,
  onEndGame
}) => {
  const isCurrentPlayerTurn = game.players[game.currentPlayer] === currentUserId;
  const currentPlayerSymbol = Object.keys(game.players).find(
    symbol => game.players[symbol as keyof typeof game.players] === currentUserId
  );

  const getWinnerText = () => {
    if (game.isDraw) return "It's a draw! 🤝";
    if (game.winner === currentPlayerSymbol) return "You won! 🎉";
    return "AI wins this round! 🤖";
  };

  const getStatusText = () => {
    if (game.status === 'completed') return getWinnerText();
    if (isCurrentPlayerTurn) return "Your turn! 🎯";
    return "AI is thinking... 🤔";
  };

  const renderCell = (position: number) => {
    const value = game.board[position];
    const isWinningMove = false; // We could enhance this to highlight winning moves

    return (
      <motion.button
        key={position}
        className={`
          w-20 h-20 border-2 border-gray-300 dark:border-gray-600 rounded-xl
          flex items-center justify-center text-2xl font-bold
          transition-all duration-200
          ${!value && !game.winner && isCurrentPlayerTurn 
            ? 'hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer hover:border-blue-400' 
            : 'cursor-not-allowed'
          }
          ${isWinningMove ? 'bg-green-100 dark:bg-green-900' : 'bg-white dark:bg-gray-800'}
        `}
        onClick={() => onMove(position)}
        disabled={!!value || !!game.winner || !isCurrentPlayerTurn}
        whileHover={!value && !game.winner && isCurrentPlayerTurn ? { scale: 1.05 } : {}}
        whileTap={!value && !game.winner && isCurrentPlayerTurn ? { scale: 0.95 } : {}}
      >
        <AnimatePresence>
          {value && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {value === 'X' ? (
                <X className="w-8 h-8 text-blue-500" />
              ) : (
                <Circle className="w-8 h-8 text-purple-500" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-200/50 dark:border-gray-700/50"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Gamepad2 className="w-6 h-6 text-purple-500" />
            </motion.div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Tic Tac Toe vs AI
            </h2>
            <Bot className="w-5 h-5 text-blue-500" />
          </div>
          <Button variant="ghost" size="sm" onClick={onEndGame}>
            ✕
          </Button>
        </div>

        {/* Game Status */}
        <div className="text-center mb-6">
          {game.status === 'completed' ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="space-y-2"
            >
              <div className="text-2xl">
                {game.winner === currentPlayerSymbol ? (
                  <Trophy className="w-8 h-8 text-yellow-500 mx-auto" />
                ) : game.isDraw ? (
                  <div className="flex justify-center space-x-2">
                    <Trophy className="w-6 h-6 text-gray-400" />
                    <Bot className="w-6 h-6 text-gray-400" />
                  </div>
                ) : (
                  <Bot className="w-8 h-8 text-purple-500 mx-auto" />
                )}
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {getWinnerText()}
              </p>
            </motion.div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You are{' '}
                <span className="font-semibold">
                  {currentPlayerSymbol === 'X' ? (
                    <>X <X className="w-4 h-4 inline text-blue-500" /></>
                  ) : (
                    <>O <Circle className="w-4 h-4 inline text-purple-500" /></>
                  )}
                </span>
                {' '}• AI is{' '}
                <span className="font-semibold">
                  {currentPlayerSymbol === 'X' ? (
                    <>O <Circle className="w-4 h-4 inline text-purple-500" /></>
                  ) : (
                    <>X <X className="w-4 h-4 inline text-blue-500" /></>
                  )}
                </span>
              </p>
              <motion.p 
                className="text-lg font-semibold text-gray-900 dark:text-white"
                animate={!isCurrentPlayerTurn ? { opacity: [1, 0.5, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {getStatusText()}
              </motion.p>
            </div>
          )}
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-3 mb-6 justify-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
          {Array.from({ length: 9 }, (_, i) => renderCell(i))}
        </div>

        {/* Game Controls */}
        <div className="flex justify-center space-x-4">
          <Button
            variant="secondary"
            onClick={onReset}
            className="flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>New Game</span>
          </Button>
          <Button variant="ghost" onClick={onEndGame}>
            Close Game
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};