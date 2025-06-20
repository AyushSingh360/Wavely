import { useState, useCallback } from 'react';
import { GameState, GameStats } from '../types';
import { aiService } from '../services/aiService';

export const useGame = () => {
  const [currentGame, setCurrentGame] = useState<GameState | null>(null);
  const [gameStats, setGameStats] = useState<GameStats>({
    wins: 0,
    losses: 0,
    draws: 0,
    totalGames: 0
  });

  const createGame = useCallback((player1Id: string, player2Id: string) => {
    const gameId = Date.now().toString();
    const newGame: GameState = {
      id: gameId,
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      isDraw: false,
      players: { X: player1Id, O: player2Id },
      status: 'playing'
    };
    setCurrentGame(newGame);
    return gameId;
  }, []);

  const makeMove = useCallback(async (position: number) => {
    if (!currentGame || currentGame.board[position] || currentGame.winner) {
      return false;
    }

    const newBoard = [...currentGame.board];
    newBoard[position] = currentGame.currentPlayer;

    const winner = checkWinner(newBoard);
    const isDraw = !winner && newBoard.every(cell => cell !== null);

    setCurrentGame(prev => {
      if (!prev) return null;
      
      const updatedGame = {
        ...prev,
        board: newBoard,
        currentPlayer: prev.currentPlayer === 'X' ? 'O' : 'X',
        winner,
        isDraw,
        status: (winner || isDraw) ? 'completed' as const : 'playing' as const
      };

      // Update stats when game ends
      if (winner || isDraw) {
        setGameStats(prevStats => {
          const isPlayerX = prev.players.X === 'current';
          const playerWon = (winner === 'X' && isPlayerX) || (winner === 'O' && !isPlayerX);
          
          return {
            ...prevStats,
            wins: playerWon ? prevStats.wins + 1 : prevStats.wins,
            losses: winner && !playerWon ? prevStats.losses + 1 : prevStats.losses,
            draws: isDraw ? prevStats.draws + 1 : prevStats.draws,
            totalGames: prevStats.totalGames + 1
          };
        });
      }

      return updatedGame;
    });

    // If it's AI's turn and game is still ongoing, make AI move
    if (!winner && !isDraw && currentGame.currentPlayer === 'X') {
      setTimeout(async () => {
        try {
          const aiMove = await aiService.generateGameMove(newBoard, 'medium');
          makeAIMove(aiMove);
        } catch (error) {
          console.error('Error making AI move:', error);
        }
      }, 1000);
    }

    return true;
  }, [currentGame]);

  const makeAIMove = useCallback((position: number) => {
    setCurrentGame(prev => {
      if (!prev || prev.board[position] || prev.winner) {
        return prev;
      }

      const newBoard = [...prev.board];
      newBoard[position] = prev.currentPlayer;

      const winner = checkWinner(newBoard);
      const isDraw = !winner && newBoard.every(cell => cell !== null);

      const updatedGame = {
        ...prev,
        board: newBoard,
        currentPlayer: prev.currentPlayer === 'X' ? 'O' : 'X',
        winner,
        isDraw,
        status: (winner || isDraw) ? 'completed' as const : 'playing' as const
      };

      // Update stats when game ends
      if (winner || isDraw) {
        setGameStats(prevStats => {
          const isPlayerX = prev.players.X === 'current';
          const playerWon = (winner === 'X' && isPlayerX) || (winner === 'O' && !isPlayerX);
          
          return {
            ...prevStats,
            wins: playerWon ? prevStats.wins + 1 : prevStats.wins,
            losses: winner && !playerWon ? prevStats.losses + 1 : prevStats.losses,
            draws: isDraw ? prevStats.draws + 1 : prevStats.draws,
            totalGames: prevStats.totalGames + 1
          };
        });
      }

      return updatedGame;
    });
  }, []);

  const resetGame = useCallback(() => {
    if (currentGame) {
      setCurrentGame({
        ...currentGame,
        board: Array(9).fill(null),
        currentPlayer: 'X',
        winner: null,
        isDraw: false,
        status: 'playing'
      });
    }
  }, [currentGame]);

  const endGame = useCallback(() => {
    setCurrentGame(null);
  }, []);

  return {
    currentGame,
    gameStats,
    createGame,
    makeMove,
    resetGame,
    endGame
  };
};

const checkWinner = (board: (string | null)[]): string | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
};