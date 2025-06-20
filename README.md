# 🌊 Wavely - AI-Powered Messaging Platform

<div align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.5.3-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-3.4.1-blue?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-10.18.0-pink?style=for-the-badge&logo=framer" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Vite-5.4.2-purple?style=for-the-badge&logo=vite" alt="Vite" />
</div>

<div align="center">
  <h3>🤖 Chat with AI • 🎮 Play Games • 🔥 Send Secret Messages • 📞 Make Calls</h3>
  <p><em>A modern, feature-rich messaging platform with integrated AI companions and gaming</em></p>
</div>

---

## ✨ Features

### 💬 **Smart AI Messaging**
- **Multiple AI Personalities**: Chat with AI Assistant, Luna AI, and Nova Bot - each with unique personalities
- **Contextual Responses**: AI understands conversation context, emotions, and questions
- **Real-time Typing Indicators**: See when AI is composing responses
- **Message Status Tracking**: Sent, delivered, and read receipts

### 🎮 **Integrated Gaming**
- **Tic Tac Toe vs AI**: Challenge AI companions to strategic games
- **Smart AI Opponents**: Multiple difficulty levels with minimax algorithm
- **Game Statistics**: Track wins, losses, draws, and win rates
- **Seamless Integration**: Start games directly from chat interface

### 🔥 **Secret Messages**
- **Disappearing Messages**: Send messages that expire after a set time
- **View-Once Feature**: Messages disappear after being viewed
- **Customizable Timers**: 15 seconds to 5 minutes expiration
- **Visual Indicators**: Special UI for secret message handling

### 📞 **Communication Features**
- **Voice & Video Calls**: Simulated calling interface with realistic controls
- **Call Management**: Mute, speaker, and video toggle controls
- **Call Duration Tracking**: Real-time call timer
- **Connection Simulation**: Realistic connecting and connected states

### 🎨 **Modern UI/UX**
- **Dark/Light Mode**: System-aware theme switching with smooth transitions
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion powered micro-interactions
- **Gradient Themes**: Beautiful blue-purple-teal color schemes

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AyushSingh360/Wavely
   cd wavely
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

---

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── chat/            # Chat-related components
│   │   ├── ChatList.tsx         # Conversation list
│   │   ├── ChatWindow.tsx       # Main chat interface
│   │   ├── MessageBubble.tsx    # Individual message display
│   │   ├── MessageInput.tsx     # Message composition
│   │   └── CallInterface.tsx    # Voice/video call UI
│   ├── game/            # Gaming components
│   │   ├── TicTacToe.tsx       # Game board and logic
│   │   └── GameStats.tsx       # Statistics modal
│   ├── layout/          # Layout components
│   │   ├── Header.tsx          # App header with search
│   │   └── EmptyState.tsx      # Welcome screen
│   └── ui/              # Reusable UI components
│       ├── Button.tsx          # Custom button component
│       ├── LoadingSpinner.tsx  # Loading animations
│       └── ThemeToggle.tsx     # Dark/light mode toggle
├── hooks/               # Custom React hooks
│   ├── useMessages.ts          # Message management
│   ├── useGame.ts             # Game state management
│   └── useTheme.ts            # Theme management
├── services/            # External services
│   └── aiService.ts           # AI response generation
├── types/               # TypeScript definitions
│   └── index.ts              # Type definitions
└── App.tsx             # Main application component
```

---

## 🤖 AI Features

### **AI Personalities**

1. **AI Assistant** 🤖
   - Helpful and informative responses
   - Great for general conversations
   - Strategic gaming approach

2. **Luna AI** 🌙
   - Creative and playful personality
   - Emoji-rich responses
   - Fun gaming style

3. **Nova Bot** ⭐
   - Strategic and analytical
   - Focused on gaming excellence
   - Technical conversations

### **AI Capabilities**
- **Context Awareness**: Remembers conversation history
- **Emotion Recognition**: Responds appropriately to emotional content
- **Question Handling**: Provides thoughtful answers
- **Game Strategy**: Uses minimax algorithm for optimal moves
- **Natural Language**: Human-like conversation patterns

---

## 🎮 Gaming System

### **Tic Tac Toe Features**
- **Real-time Gameplay**: Instant move processing
- **AI Difficulty Levels**:
  - **Easy**: Random moves
  - **Medium**: Strategic with some randomness
  - **Hard**: Optimal minimax algorithm
- **Visual Feedback**: Smooth animations and hover effects
- **Game Statistics**: Persistent win/loss tracking

### **Game Flow**
1. Click game controller icon in chat
2. AI accepts challenge automatically
3. Play alternating turns (you're X, AI is O)
4. View results and statistics
5. Start new games or return to chat

---

## 🔥 Secret Messages

### **How It Works**
1. Click the flame icon (🔥) in message input
2. Choose expiration time (15s - 5min)
3. Type your secret message
4. Send with special "Send Secret" button

### **Security Features**
- **Time-based Expiration**: Messages auto-delete
- **View-once Mechanism**: Disappear after being read
- **Visual Indicators**: Special UI for secret messages
- **No AI Response**: Maintains message privacy

---

## 📞 Calling Features

### **Voice Calls**
- Click phone icon to start voice call
- Realistic connection simulation
- Mute/unmute controls
- Speaker toggle
- Call duration tracking

### **Video Calls**
- Click video icon to start video call
- Simulated video interface
- Camera on/off controls
- Self-preview window
- Full-screen call interface

---

## 🎨 Theming & Customization

### **Theme System**
- **Auto-detection**: Respects system preferences
- **Manual Toggle**: Header theme switcher
- **Smooth Transitions**: Animated theme changes
- **Persistent Storage**: Remembers user preference

### **Color Palette**
```css
/* Primary Colors */
Blue: #3B82F6 → #1D4ED8
Purple: #8B5CF6 → #6D28D9
Teal: #10B981 → #047857

/* Gradients */
Header: blue → purple → teal
Backgrounds: blue/50 → purple/50 → teal/50
Secret Messages: orange → red
```

---

## 🛠️ Development

### **Available Scripts**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### **Tech Stack**
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Date Handling**: date-fns

### **Key Dependencies**
```json
{
  "react": "^18.3.1",
  "framer-motion": "^10.18.0",
  "lucide-react": "^0.344.0",
  "date-fns": "^3.0.6",
  "tailwindcss": "^3.4.1"
}
```

---

## 🔧 Configuration

### **Environment Setup**
No environment variables required for basic functionality. The app runs entirely client-side with simulated AI responses.

### **Customization Options**
- **AI Personalities**: Modify `src/services/aiService.ts`
- **Themes**: Update `tailwind.config.js`
- **Game Difficulty**: Adjust AI algorithms in `aiService.ts`
- **Message Timers**: Configure in `MessageInput.tsx`

---

## 📱 Mobile Responsiveness

### **Breakpoints**
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

### **Mobile Features**
- Touch-optimized controls
- Responsive chat layout
- Mobile-friendly game board
- Optimized call interface

---

## 🚀 Performance

### **Optimizations**
- **Code Splitting**: Lazy loading for components
- **Animation Performance**: GPU-accelerated transitions
- **Memory Management**: Cleanup of intervals and timeouts
- **Bundle Size**: Optimized imports and tree shaking

### **Best Practices**
- React.memo for expensive components
- useCallback for event handlers
- Efficient re-rendering patterns
- Proper cleanup in useEffect

---

## 🤝 Contributing

### **Development Workflow**
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### **Code Standards**
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Component documentation

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Framer Motion** - For beautiful animations
- **Tailwind CSS** - For utility-first styling
- **Lucide** - For beautiful icons
- **Pexels** - For stock photos

---

<div align="center">
  <h3>🌊 Made with ❤️ by the Wavely Team</h3>
  <p><em>Bringing AI-powered conversations to life</em></p>
</div>
