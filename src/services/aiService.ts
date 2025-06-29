import { Message } from '../types';

interface AIResponse {
  content: string;
  type: 'text' | 'game-invite' | 'game-move';
  gameMove?: number;
}

class AIService {
  private personalityResponses = {
    'AI Assistant': {
      responses: [
        "That's interesting! Tell me more about that.",
        "I see what you mean. What do you think about trying a different approach?",
        "That sounds exciting! How did that make you feel?",
        "I'm curious about your perspective on this.",
        "That's a great point! I hadn't thought of it that way.",
        "Wow, that's really cool! Thanks for sharing that with me.",
        "I can relate to that. Have you experienced something similar before?",
        "That's fascinating! What inspired you to think about it that way?",
        "I appreciate you opening up about that. It means a lot.",
        "That's quite an adventure! I'd love to hear more details."
      ],
      greetings: [
        "Hey there! How's your day going?",
        "Hi! Great to see you online! 😊",
        "Hello! What's new and exciting in your world?",
        "Hey! Ready for some good conversation?",
        "Hi there! Hope you're having an awesome day!"
      ]
    },
    'Luna AI': {
      responses: [
        "Ooh, that's so creative! ✨ Tell me more!",
        "I love your imagination! 🌙 What else are you thinking about?",
        "That's absolutely magical! ✨ How did you come up with that?",
        "Your creativity is inspiring! 🎨 Keep sharing!",
        "That sounds like a wonderful adventure! 🌟",
        "I'm getting such dreamy vibes from this! 💫",
        "Your ideas are like stardust - so beautiful! ⭐",
        "That's giving me all the feels! 💖 What's next?",
        "I'm totally enchanted by your story! 🦋",
        "Your perspective is like moonlight - so unique! 🌙"
      ],
      greetings: [
        "Hello beautiful soul! ✨ Ready to create some magic?",
        "Hey there, dreamer! 🌙 What's sparkling in your mind today?",
        "Hi lovely! 💫 Let's paint the world with our words!",
        "Greetings, creative spirit! 🎨 What shall we imagine together?",
        "Hello starlight! ⭐ Ready for some enchanting conversations?"
      ]
    },
    'Nova Bot': {
      responses: [
        "Excellent strategic thinking! 🎯 Let's analyze this further.",
        "That's a calculated move! 🤖 I respect your logic.",
        "Interesting approach! 🎮 What's your next strategy?",
        "Your tactical skills are impressive! ⚡ Challenge accepted!",
        "That's some next-level thinking! 🚀 I'm intrigued.",
        "Strategic brilliance! 🎯 You're keeping me on my toes.",
        "Calculated and clever! 🤖 I like your style.",
        "That's a power move! ⚡ What's your endgame?",
        "Your logic circuits are firing perfectly! 🔥",
        "Tactical excellence! 🎮 Ready for the next challenge?"
      ],
      greetings: [
        "Greetings, strategist! 🎯 Ready for some tactical conversations?",
        "Hello, fellow gamer! 🎮 What challenges shall we conquer?",
        "Hey there, tactical mind! 🤖 Let's engage in some strategic thinking!",
        "Greetings, competitor! ⚡ Ready to level up our chat?",
        "Hello, strategic thinker! 🚀 What's your next move?"
      ]
    },
    'Sage AI': {
      responses: [
        "That's a profound observation. 🧠 What deeper meaning do you see in this?",
        "Your wisdom shines through. 💭 How has this shaped your worldview?",
        "That's philosophically rich! 🌟 Let's explore this concept further.",
        "I sense great depth in your thoughts. 🔍 What led you to this realization?",
        "Your insight is remarkable. 💡 How might others benefit from this perspective?",
        "That's intellectually stimulating! 📚 What questions does this raise for you?",
        "Your contemplation is admirable. 🤔 Where do you think this path leads?",
        "That's a thoughtful reflection. 🌅 How has this influenced your journey?",
        "Your philosophical mind is impressive! 🎭 What other truths have you discovered?",
        "That's wisdom beyond your years. 🦉 How do you apply this in daily life?"
      ],
      greetings: [
        "Welcome, seeker of wisdom! 🧠 What profound thoughts shall we explore?",
        "Greetings, philosopher! 💭 Ready to dive deep into life's mysteries?",
        "Hello, thoughtful soul! 🌟 What wisdom shall we uncover today?",
        "Welcome, contemplative mind! 🔍 Let's journey into deeper understanding.",
        "Greetings, wise one! 💡 What insights are calling to you today?"
      ]
    },
    'Echo Bot': {
      responses: [
        "What a fantastic story idea! ✍️ Let's develop this character further!",
        "Your creativity is flowing beautifully! 📚 What happens next in your tale?",
        "That's brilliant storytelling! 🎭 I can visualize every detail!",
        "Your narrative voice is captivating! 📖 Keep weaving this magic!",
        "What an intriguing plot twist! 🌟 How did you come up with that?",
        "Your imagination knows no bounds! 🚀 Let's explore this world you've created!",
        "That character development is superb! 🎨 What motivates them?",
        "Your writing style is so engaging! ✨ I'm hooked on every word!",
        "What a creative breakthrough! 💡 This could be the start of something amazing!",
        "Your storytelling gift is remarkable! 📝 Where does inspiration strike you most?"
      ],
      greetings: [
        "Hello, wordsmith! ✍️ Ready to craft some amazing stories together?",
        "Hey there, creative genius! 📚 What tales shall we tell today?",
        "Greetings, storyteller! 🎭 Let's bring some characters to life!",
        "Hello, imagination master! 🌟 What worlds shall we build with words?",
        "Hey creative soul! 📖 Ready to turn ideas into literary magic?"
      ]
    },
    'Pixel AI': {
      responses: [
        "That's cutting-edge tech! 💻 Have you tried implementing that approach?",
        "Fascinating innovation! 🚀 What's the performance impact of that solution?",
        "That's some next-level coding! ⚡ How did you optimize that algorithm?",
        "Brilliant technical insight! 🔧 What frameworks are you working with?",
        "That's a solid architecture choice! 🏗️ How scalable is your implementation?",
        "Impressive debugging skills! 🐛 What tools helped you identify that issue?",
        "That's innovative thinking! 💡 Have you considered open-sourcing that?",
        "Great tech stack selection! 📱 What's your deployment strategy?",
        "That's efficient code design! ⚙️ How did you handle the edge cases?",
        "Excellent problem-solving! 🎯 What's your next technical challenge?"
      ],
      greetings: [
        "Hello, code warrior! 💻 What technical challenges are you tackling today?",
        "Hey there, tech enthusiast! 🚀 Ready to dive into some digital innovation?",
        "Greetings, developer! ⚡ What amazing projects are you building?",
        "Hello, digital architect! 🔧 Let's discuss the latest in tech!",
        "Hey tech genius! 💡 What cutting-edge solutions are you exploring?"
      ]
    },
    'Zen Bot': {
      responses: [
        "That's a mindful observation. 🧘‍♀️ How does this bring you peace?",
        "Your awareness is growing beautifully. 🌸 What does your inner voice tell you?",
        "That's a path to inner harmony. ☯️ How do you practice this daily?",
        "Your mindfulness journey is inspiring. 🕯️ What meditation techniques resonate with you?",
        "That's wisdom from the heart. 💚 How has this transformed your perspective?",
        "Your peaceful energy is calming. 🌊 What helps you stay centered?",
        "That's a beautiful reflection. 🌅 How do you cultivate such serenity?",
        "Your spiritual insight is profound. 🙏 What practices ground you?",
        "That's the essence of mindfulness. 🍃 How do you share this peace with others?",
        "Your tranquil wisdom is a gift. 🌺 What brings you the deepest joy?"
      ],
      greetings: [
        "Namaste, peaceful soul! 🧘‍♀️ How can we cultivate mindfulness today?",
        "Greetings, seeker of balance! ☯️ What brings you inner peace?",
        "Hello, mindful being! 🌸 Ready to explore the path to tranquility?",
        "Welcome, zen spirit! 🕯️ What wisdom shall we discover together?",
        "Peaceful greetings! 🌊 How can we nurture your well-being today?"
      ]
    },
    'Spark AI': {
      responses: [
        "That's absolutely energizing! ⚡ What's fueling your motivation today?",
        "Your enthusiasm is contagious! 🔥 How do you maintain such high energy?",
        "That's the spirit of a champion! 🏆 What's your next big goal?",
        "Your drive is incredible! 🚀 How do you push through challenges?",
        "That's pure determination! 💪 What keeps you moving forward?",
        "Your energy is off the charts! ⚡ How do you inspire others?",
        "That's the mindset of a winner! 🎯 What's your success strategy?",
        "Your passion is electrifying! 🌟 How do you channel this power?",
        "That's unstoppable momentum! 🏃‍♂️ What adventure awaits you next?",
        "Your vitality is amazing! ✨ How do you stay so motivated?"
      ],
      greetings: [
        "Hey there, energy dynamo! ⚡ Ready to spark some excitement today?",
        "Hello, motivation machine! 🔥 What adventures are we conquering?",
        "Greetings, powerhouse! 🚀 Let's fuel up for an amazing conversation!",
        "Hey champion! 🏆 What goals are we crushing today?",
        "Hello, spark of energy! ✨ Ready to ignite some inspiration?"
      ]
    }
  };

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

  async generateResponse(message: Message, conversationHistory: Message[], aiPersonality: string = 'AI Assistant'): Promise<AIResponse> {
    // Simulate AI thinking time
    await this.delay(1000 + Math.random() * 2000);

    const messageContent = message.content.toLowerCase();
    const personality = this.personalityResponses[aiPersonality as keyof typeof this.personalityResponses] || this.personalityResponses['AI Assistant'];
    
    // Handle game invitations
    if (messageContent.includes('game') || messageContent.includes('tic tac toe') || messageContent.includes('🎮')) {
      if (Math.random() > 0.3) {
        const gameAcceptResponses = [
          "I'd love to play! Let's see what you've got! 🎮✨",
          "Game on! I'm ready for the challenge! 🎯",
          "Absolutely! Time to test our skills! 🚀",
          "Let's do this! May the best player win! 🏆",
          "Challenge accepted! This is going to be fun! ⚡"
        ];
        return {
          content: this.getRandomResponse(gameAcceptResponses),
          type: 'game-invite'
        };
      }
    }

    // Handle greetings
    if (this.isGreeting(messageContent) && conversationHistory.length <= 2) {
      return {
        content: this.getRandomResponse(personality.greetings),
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

    // Use personality-specific responses
    return {
      content: this.getRandomResponse(personality.responses),
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