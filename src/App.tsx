import React from 'react';
import { motion } from 'framer-motion';
import { ChatList } from './components/chat/ChatList';
import { ChatWindow } from './components/chat/ChatWindow';
import { TicTacToe } from './components/game/TicTacToe';
import { Header } from './components/layout/Header';
import { EmptyState } from './components/layout/EmptyState';
import { useMessages } from './hooks/useMessages';
import { useGame } from './hooks/useGame';

function App() {
  const {
    chats,
    activeChat,
    setActiveChat,
    sendMessage,
    markAsRead,
    currentUser
  } = useMessages();

  const {
    currentGame,
    gameStats,
    createGame,
    makeMove,
    resetGame,
    endGame
  } = useGame();

  const handleChatSelect = (chatId: string) => {
    setActiveChat(chatId);
    markAsRead(chatId);
  };

  const handleSendMessage = (message: string) => {
    if (activeChat) {
      sendMessage(activeChat, message);
    }
  };

  const handleGameInvite = () => {
    if (activeChat) {
      const chat = chats.find(c => c.id === activeChat);
      const otherUser = chat?.participants.find(p => p.id !== currentUser.id);
      if (otherUser) {
        createGame(currentUser.id, otherUser.id);
        sendMessage(activeChat, `🎮 Game invitation sent! Let's play Tic Tac Toe!`, 'game-invite');
      }
    }
  };

  const activeChatData = chats.find(c => c.id === activeChat);

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header gameStats={gameStats} />
      
      <div className="flex-1 flex overflow-hidden">
        <ChatList
          chats={chats}
          activeChat={activeChat}
          onChatSelect={handleChatSelect}
          currentUser={currentUser}
        />

        {activeChatData ? (
          <ChatWindow
            chat={activeChatData}
            currentUser={currentUser}
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
          currentUserId={currentUser.id}
          onMove={makeMove}
          onReset={resetGame}
          onEndGame={endGame}
        />
      )}
    </div>
  );
}

export default App;