import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatList } from './components/chat/ChatList';
import { ChatWindow } from './components/chat/ChatWindow';
import { TicTacToe } from './components/game/TicTacToe';
import { Header } from './components/layout/Header';
import { EmptyState } from './components/layout/EmptyState';
import { AuthPage } from './components/auth/AuthPage';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { useMessages } from './hooks/useMessages';
import { useGame } from './hooks/useGame';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, isAuthenticated, isLoading, login, signup, logout } = useAuth();

  const {
    chats,
    activeChat,
    setActiveChat,
    sendMessage,
    markAsRead
  } = useMessages(user);

  const {
    currentGame,
    gameStats,
    createGame,
    makeMove,
    resetGame,
    endGame
  } = useGame();

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <LoadingSpinner size="lg" />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-gray-600 dark:text-gray-400"
          >
            Loading Wavely...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  // Show auth page if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <AuthPage
        onLogin={login}
        onSignup={signup}
        isLoading={isLoading}
      />
    );
  }

  const handleChatSelect = (chatId: string) => {
    setActiveChat(chatId);
    markAsRead(chatId);
  };

  const handleSendMessage = (message: string, type?: 'text' | 'secret') => {
    if (activeChat) {
      sendMessage(activeChat, message, type);
    }
  };

  const handleGameInvite = () => {
    if (activeChat) {
      const chat = chats.find(c => c.id === activeChat);
      const otherUser = chat?.participants.find(p => p.id !== user.id);
      if (otherUser) {
        createGame(user.id, otherUser.id);
        sendMessage(activeChat, `🎮 Game invitation sent! Let's play Tic Tac Toe!`, 'game-invite');
      }
    }
  };

  const activeChatData = chats.find(c => c.id === activeChat);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="main-app"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900"
      >
        <Header 
          gameStats={gameStats} 
          user={user}
          onLogout={logout}
        />
        
        <div className="flex-1 flex overflow-hidden">
          <ChatList
            chats={chats}
            activeChat={activeChat}
            onChatSelect={handleChatSelect}
            currentUser={user}
          />

          {activeChatData ? (
            <ChatWindow
              chat={activeChatData}
              currentUser={user}
              onSendMessage={handleSendMessage}
              onGameInvite={handleGameInvite}
            />
          ) : (
            <EmptyState />
          )}
        </div>

        {currentGame && (
          <TicTacToe
            game={currentGame}
            currentUserId={user.id}
            onMove={makeMove}
            onReset={resetGame}
            onEndGame={endGame}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default App;