import { Message } from '../types';

interface AIResponse {
  content: string;
  type: 'text' | 'game-invite' | 'game-move';
  gameMove?: number;
}

class AIService {
  private responses = [
    "That's interesting! Tell me more about that.",
    "I see what you mean. What do you think about trying a different approach?",
    "That sounds exciting! How did that make you feel?",
    "I'm curious about your perspective on this.",
    "That's a great point! I hadn't thought of it that way.",
    "Wow, that's really cool! Thanks for sharing that with me.",
    "I can relate to that. Have you experienced something similar before?",
    "That's fascinating! What inspired you to think about it that way?",
    "I appreciate you opening up about that. It means a lot.",
    "That's quite an adventure! I'd love to hear more details.",
    "You have such a unique way of looking at things!",
    "That sounds like it was quite an experience!",
    "I'm impressed by your creativity and thinking!",
    "That's really thoughtful of you to consider all angles.",
    "Your enthusiasm is contagious! I love your energy!"
  ];

  private gameResponses = [
    "Nice move! Let me think about my strategy... 🤔",
    "Interesting choice! You're getting better at this game.",
    "Good game so far! This is getting competitive.",
    "You're making me work for this win! 😄",
    "Strategic thinking! I like your approach.",
    "This is fun! Thanks for the game challenge.",
    "You're keeping me on my toes with these moves!",
    "Great game! Win or lose, this is entertaining."
  ];

  private greetings = [
    "Hey there! How's your day going?",
    "Hi! Great to see you online! 😊",
    "Hello! What's new and exciting in your world?",
    "Hey! Ready for some good conversation?",
    "Hi there! Hope you're having an awesome day!",
    "Hello! What's on your mind today?",
    "Hey! Thanks for reaching out. What's up?"
  ];

  async generateResponse(message: Message, conversationHistory: Message[]): Promise<AIResponse> {
    // Simulate AI thinking time
    await this.delay(1000 + Math.random() * 2000);

    const messageContent = message.content.toLowerCase();
    
    // Handle game invitations
    if (messageContent.includes('game') || messageContent.includes('tic tac toe') || messageContent.includes('🎮')) {
      if (Math.random() > 0.3) {
        return {
          content: "I'd love to play! Let's see what you've got! 🎮✨",
          type: 'game-invite'
        };
      }
    }

    // Handle greetings
    if (this.isGreeting(messageContent) && conversationHistory.length <= 2) {
      return {
        content: this.getRandomResponse(this.greetings),
        type: 'text'
      };
    }

    // Handle questions
    if (messageContent.includes('?')) {
      const questionResponses = [
        "That's a great question! I think it depends on the context.",
        "Hmm, let me think about that... I'd say it varies from person to person.",
        "Interesting question! What's your take on it?",
        "That's something I've been pondering too. What made you think of that?",
        "Good question! I'm curious to hear your thoughts first."
      ];
      return {
        content: this.getRandomResponse(questionResponses),
        type: 'text'
      };
    }

    // Handle emotional expressions
    if (this.containsEmotionalWords(messageContent)) {
      const emotionalResponses = [
        "I can understand how that would feel. Thanks for sharing that with me.",
        "That sounds like quite an emotional experience. How are you processing it?",
        "I appreciate you being open about your feelings. That takes courage.",
        "It sounds like you're going through a lot. I'm here to listen.",
        "Your feelings are completely valid. Thank you for trusting me with this."
      ];
      return {
        content: this.getRandomResponse(emotionalResponses),
        type: 'text'
      };
    }

    // Default responses
    return {
      content: this.getRandomResponse(this.responses),
      type: 'text'
    };
  }

  async generateGameMove(board: (string | null)[], difficulty: 'easy' | 'medium' | 'hard' = 'medium'): Promise<number> {
    // Simulate AI thinking time
    await this.delay(800 + Math.random() * 1500);

    if (difficulty === 'easy') {
      return this.getRandomMove(board);
    } else if (difficulty === 'medium') {
      return this.getMediumMove(board);
    } else {
      return this.getHardMove(board);
    }
  }

  private getRandomMove(board: (string | null)[]): number {
    const availableMoves = board
      .map((cell, index) => cell === null ? index : null)
      .filter(index => index !== null) as number[];
    
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

  private getMediumMove(board: (string | null)[]): number {
    // Try to win first
    const winMove = this.findWinningMove(board, 'O');
    if (winMove !== -1) return winMove;

    // Block player from winning
    const blockMove = this.findWinningMove(board, 'X');
    if (blockMove !== -1) return blockMove;

    // Take center if available
    if (board[4] === null) return 4;

    // Take corners
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(pos => board[pos] === null);
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    // Take any available move
    return this.getRandomMove(board);
  }

  private getHardMove(board: (string | null)[]): number {
    return this.minimax(board, 'O').position;
  }

  private findWinningMove(board: (string | null)[], player: string): number {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      const line = [board[a], board[b], board[c]];
      
      if (line.filter(cell => cell === player).length === 2 && line.includes(null)) {
        return pattern[line.indexOf(null)];
      }
    }
    
    return -1;
  }

  private minimax(board: (string | null)[], player: string): { score: number; position: number } {
    const availableMoves = board
      .map((cell, index) => cell === null ? index : null)
      .filter(index => index !== null) as number[];

    if (this.checkWinner(board) === 'X') return { score: -10, position: -1 };
    if (this.checkWinner(board) === 'O') return { score: 10, position: -1 };
    if (availableMoves.length === 0) return { score: 0, position: -1 };

    const moves: { score: number; position: number }[] = [];

    for (const move of availableMoves) {
      const newBoard = [...board];
      newBoard[move] = player;

      const result = player === 'O' 
        ? this.minimax(newBoard, 'X')
        : this.minimax(newBoard, 'O');

      moves.push({ score: result.score, position: move });
    }

    if (player === 'O') {
      return moves.reduce((best, move) => move.score > best.score ? move : best);
    } else {
      return moves.reduce((best, move) => move.score < best.score ? move : best);
    }
  }

  private checkWinner(board: (string | null)[]): string | null {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  }

  private isGreeting(message: string): boolean {
    const greetingWords = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy', 'greetings'];
    return greetingWords.some(greeting => message.includes(greeting));
  }

  private containsEmotionalWords(message: string): boolean {
    const emotionalWords = [
      'feel', 'feeling', 'sad', 'happy', 'excited', 'worried', 'anxious', 
      'love', 'hate', 'angry', 'frustrated', 'disappointed', 'proud', 
      'grateful', 'thankful', 'scared', 'nervous', 'confident', 'hopeful'
    ];
    return emotionalWords.some(word => message.includes(word));
  }

  private getRandomResponse(responses: string[]): string {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getGameResponse(): string {
    return this.getRandomResponse(this.gameResponses);
  }
}

export const aiService = new AIService();