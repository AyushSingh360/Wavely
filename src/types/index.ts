export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  type: 'text' | 'emoji' | 'media' | 'game-invite' | 'game-result' | 'secret';
  gameData?: {
    type: 'tic-tac-toe';
    gameId: string;
    status: 'invite' | 'accepted' | 'declined' | 'completed';
    winner?: string;
  };
  secretData?: {
    expiresAt: Date;
    isExpired: boolean;
    viewedBy: string[];
  };
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: Date;
  isTyping?: boolean;
}

export interface Chat {
  id: string;
  participants: User[];
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
}

export interface GameState {
  id: string;
  board: (string | null)[];
  currentPlayer: string;
  winner: string | null;
  isDraw: boolean;
  players: { X: string; O: string };
  status: 'waiting' | 'playing' | 'completed';
}

export interface GameStats {
  wins: number;
  losses: number;
  draws: number;
  totalGames: number;
}

export interface CallState {
  isActive: boolean;
  type: 'voice' | 'video';
  participant?: User;
  duration: number;
  status: 'connecting' | 'connected' | 'ended';
}