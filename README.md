# 🌊 Wavely - AI-Powered Messaging Platform

<div align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.5.3-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-3.4.1-blue?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-10.18.0-pink?style=for-the-badge&logo=framer" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Vite-5.4.2-purple?style=for-the-badge&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Deployed-Netlify-00C7B7?style=for-the-badge&logo=netlify" alt="Deployed on Netlify" />
</div>

<div align="center">
  <h3>🤖 Chat with AI • 🎮 Play Games • 🔥 Send Secret Messages • 📞 Make Calls • ⚙️ Full Settings</h3>
  <p><em>A modern, feature-rich messaging platform with integrated AI companions, gaming, and comprehensive user management</em></p>
  
  **🚀 [Live Demo](https://fanciful-moxie-dafc44.netlify.app)**
</div>

---

## ✨ Features

### 🔐 **Complete Authentication System**
- **Secure Login/Signup**: Full authentication flow with form validation
- **Demo Mode**: Try the app instantly with any email/password (6+ characters)
- **User Profiles**: Customizable avatars and personal information
- **Session Management**: Persistent login with secure logout

### 💬 **Advanced AI Messaging**
- **8 Unique AI Personalities**: Each with distinct conversation styles and responses
  - **AI Assistant** 🤖 - Helpful and informative
  - **Luna AI** 🌙 - Creative and playful with emoji-rich responses
  - **Nova Bot** ⭐ - Strategic and analytical gaming expert
  - **Sage AI** 🧠 - Wise mentor for deep philosophical conversations
  - **Echo Bot** ✍️ - Creative writing and storytelling companion
  - **Pixel AI** 💻 - Tech-savvy developer and gadget enthusiast
  - **Zen Bot** 🧘‍♀️ - Mindful wellness and meditation guide
  - **Spark AI** ⚡ - Energetic fitness and motivation coach
- **Contextual Responses**: AI understands conversation context and emotions
- **Real-time Typing Indicators**: See when AI is composing responses
- **Message Status Tracking**: Sent, delivered, and read receipts
- **Saved Replies**: Quick access to frequently used responses with categories

### 🎮 **Integrated Gaming System**
- **Tic Tac Toe vs AI**: Challenge any AI companion to strategic games
- **Multiple Difficulty Levels**: Easy, Medium, and Hard AI opponents
- **Smart AI Strategy**: Uses minimax algorithm for optimal gameplay
- **Game Statistics**: Track wins, losses, draws, and win rates
- **Seamless Integration**: Start games directly from chat interface

### 🔥 **Secret Messages**
- **Disappearing Messages**: Send messages that expire after a set time
- **Customizable Timers**: 15 seconds to 5 minutes expiration options
- **View-Once Feature**: Messages disappear after being viewed
- **Visual Indicators**: Special flame-themed UI for secret messages
- **Privacy Protection**: AI doesn't respond to secret messages

### 📞 **Communication Features**
- **Voice & Video Calls**: Realistic calling interface with full controls
- **Call Management**: Mute, speaker, video toggle, and camera controls
- **Call Duration Tracking**: Real-time call timer and connection status
- **Connection Simulation**: Realistic connecting, connected, and ended states

### ⚙️ **Comprehensive Settings System**
- **Profile Management**: Update name, email, bio, and status
- **Appearance Customization**: Light/Dark/System themes, font sizes, animations
- **Notification Controls**: Granular control over all notification types
- **Privacy Settings**: Online status, read receipts, typing indicators
- **Chat Preferences**: Enter-to-send, auto-save replies, emoji suggestions
- **Gaming Configuration**: AI difficulty, auto-accept games, game sounds
- **Data Management**: Export/import data, storage usage, account deletion

### 🎨 **Premium UI/UX Design**
- **Apple-Level Aesthetics**: Meticulous attention to detail and polish
- **Dark/Light Mode**: System-aware theme switching with smooth transitions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Framer Motion powered micro-interactions
- **Gradient Themes**: Beautiful blue-purple-teal color schemes
- **Accessibility**: High contrast ratios and keyboard navigation

---

## 🚀 Quick Start

### 🌐 **Try It Now**
Visit the live demo: **[https://fanciful-moxie-dafc44.netlify.app](https://fanciful-moxie-dafc44.netlify.app)**

Use any email and password (6+ characters) to explore all features instantly!

### 💻 **Local Development**

#### Prerequisites
- Node.js 18+ 
- npm or yarn

#### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/wavely
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

## 🏗️ Project Architecture

```
src/
├── components/           # React components
│   ├── auth/            # Authentication components
│   │   └── AuthPage.tsx         # Login/signup interface
│   ├── chat/            # Chat-related components
│   │   ├── ChatList.tsx         # Conversation list with 8 AI chats
│   │   ├── ChatWindow.tsx       # Main chat interface
│   │   ├── MessageBubble.tsx    # Individual message display
│   │   ├── MessageInput.tsx     # Message composition with saved replies
│   │   └── CallInterface.tsx    # Voice/video call UI
│   ├── game/            # Gaming components
│   │   ├── TicTacToe.tsx       # Game board and logic
│   │   └── GameStats.tsx       # Statistics modal
│   ├── layout/          # Layout components
│   │   ├── Header.tsx          # App header with search and user menu
│   │   └── EmptyState.tsx      # Welcome screen
│   ├── settings/        # Settings components
│   │   └── SettingsModal.tsx   # Comprehensive settings interface
│   └── ui/              # Reusable UI components
│       ├── Button.tsx          # Custom button component
│       ├── LoadingSpinner.tsx  # Loading animations
│       └── ThemeToggle.tsx     # Dark/light mode toggle
├── hooks/               # Custom React hooks
│   ├── useAuth.ts             # Authentication management
│   ├── useMessages.ts         # Message and chat management
│   ├── useGame.ts             # Game state management
│   └── useTheme.ts            # Theme management
├── services/            # External services
│   └── aiService.ts           # AI response generation with 8 personalities
├── types/               # TypeScript definitions
│   └── index.ts              # Comprehensive type definitions
└── App.tsx             # Main application component with auth flow
```

---

## 🤖 AI Personalities & Features

### **Personality Showcase**

1. **AI Assistant** 🤖
   - **Style**: Professional, helpful, informative
   - **Best For**: General conversations, questions, assistance
   - **Gaming**: Strategic and analytical approach

2. **Luna AI** 🌙
   - **Style**: Creative, playful, emoji-rich responses
   - **Best For**: Creative projects, fun conversations
   - **Gaming**: Imaginative and entertaining gameplay

3. **Nova Bot** ⭐
   - **Style**: Strategic, competitive, gaming-focused
   - **Best For**: Gaming challenges, tactical discussions
   - **Gaming**: Expert-level strategic thinking

4. **Sage AI** 🧠
   - **Style**: Wise, philosophical, thought-provoking
   - **Best For**: Deep conversations, life advice, wisdom
   - **Gaming**: Contemplative and strategic moves

5. **Echo Bot** ✍️
   - **Style**: Creative writing, storytelling, literary
   - **Best For**: Writing projects, story development
   - **Gaming**: Narrative-driven gameplay approach

6. **Pixel AI** 💻
   - **Style**: Tech-savvy, coding-focused, innovative
   - **Best For**: Technology discussions, programming help
   - **Gaming**: Algorithm-based strategic thinking

7. **Zen Bot** 🧘‍♀️
   - **Style**: Mindful, peaceful, wellness-oriented
   - **Best For**: Meditation, stress relief, mindfulness
   - **Gaming**: Calm and centered gameplay

8. **Spark AI** ⚡
   - **Style**: Energetic, motivational, fitness-focused
   - **Best For**: Motivation, fitness, high-energy conversations
   - **Gaming**: Fast-paced and dynamic gameplay

### **AI Capabilities**
- **Context Awareness**: Remembers conversation history and adapts responses
- **Emotion Recognition**: Responds appropriately to emotional content
- **Question Handling**: Provides thoughtful, personality-appropriate answers
- **Game Strategy**: Uses minimax algorithm with personality-based variations
- **Natural Language**: Human-like conversation patterns unique to each AI

---

## 🎮 Gaming System

### **Tic Tac Toe Features**
- **Real-time Gameplay**: Instant move processing with smooth animations
- **AI Difficulty Levels**:
  - **Easy**: Random moves with basic strategy
  - **Medium**: Strategic with calculated risks
  - **Hard**: Optimal minimax algorithm implementation
- **Visual Feedback**: Smooth animations, hover effects, and win highlighting
- **Persistent Statistics**: Win/loss tracking across all games
- **Multi-AI Support**: Challenge any of the 8 AI personalities

### **Game Flow**
1. Click game controller icon (🎮) in any chat
2. AI accepts challenge with personality-specific response
3. Play alternating turns (you're X, AI is O)
4. View animated results and updated statistics
5. Start new games or return to chat seamlessly

---

## 🔥 Secret Messages

### **How It Works**
1. Click the flame icon (🔥) in message input
2. Choose expiration time (15s, 30s, 1min, 5min)
3. Type your secret message
4. Send with special "Send Secret" button

### **Security Features**
- **Time-based Expiration**: Messages auto-delete after timer expires
- **View-once Mechanism**: Disappear after being read once
- **Visual Indicators**: Special flame-themed UI with countdown timer
- **Privacy Protection**: AI doesn't respond to maintain secrecy
- **Real-time Countdown**: Live timer showing remaining time

---

## 📞 Advanced Calling Features

### **Voice Calls**
- Click phone icon to initiate voice call
- Realistic connection simulation with status updates
- Mute/unmute controls with visual feedback
- Speaker toggle for audio routing
- Live call duration tracking

### **Video Calls**
- Click video icon to start video call
- Simulated video interface with preview windows
- Camera on/off controls
- Self-preview window positioning
- Full-screen call interface with controls overlay

---

## ⚙️ Settings & Customization

### **Profile Settings**
- **Personal Information**: Name, email, bio, status updates
- **Avatar Management**: Profile picture with camera controls
- **Status Options**: Online, Away, Busy, Invisible modes

### **Appearance Settings**
- **Theme System**: Light, Dark, System preference detection
- **Typography**: Small, Medium, Large font size options
- **Layout Options**: Compact mode, animation toggles
- **Visual Preferences**: Smooth transitions and micro-interactions

### **Notification Management**
- **Message Notifications**: Granular control over chat alerts
- **Game Invitations**: Separate gaming notification settings
- **Sound Controls**: Audio feedback for various actions
- **Desktop Integration**: System notification support
- **Email Alerts**: Optional email notification system

### **Privacy Controls**
- **Online Status**: Show/hide online presence
- **Read Receipts**: Control message read confirmations
- **Typing Indicators**: Show/hide typing status
- **Last Seen**: Control visibility of last active time

### **Chat Preferences**
- **Input Behavior**: Enter-to-send vs Shift+Enter options
- **Auto-save Replies**: Intelligent reply suggestion system
- **Message Previews**: Chat list preview controls
- **Emoji Integration**: Smart emoji suggestion system

### **Gaming Configuration**
- **AI Difficulty**: Global difficulty setting for all games
- **Auto-accept**: Automatic game invitation acceptance
- **Game Audio**: Sound effects and audio feedback
- **Statistics Display**: Show/hide game performance data

### **Data Management**
- **Export Data**: Download all user data in JSON format
- **Import Data**: Restore from previously exported data
- **Storage Usage**: Real-time storage consumption display
- **Account Deletion**: Secure account and data removal

---

## 🎨 Design Philosophy

### **Apple-Level Aesthetics**
- **Attention to Detail**: Every pixel carefully considered
- **Intuitive UX**: Natural user interactions and flows
- **Visual Hierarchy**: Clear information architecture
- **Consistent Design Language**: Unified visual elements

### **Color System**
```css
/* Primary Gradient */
Blue: #3B82F6 → #1D4ED8
Purple: #8B5CF6 → #6D28D9
Teal: #10B981 → #047857

/* Contextual Colors */
Success: #10B981 (Green)
Warning: #F59E0B (Amber)
Error: #EF4444 (Red)
Secret: #F97316 → #DC2626 (Orange to Red)
```

### **Animation Principles**
- **Purposeful Motion**: Every animation serves a functional purpose
- **Performance Optimized**: GPU-accelerated transitions
- **Accessibility Aware**: Respects user motion preferences
- **Micro-interactions**: Subtle feedback for user actions

---

## 📱 Responsive Design

### **Breakpoint Strategy**
- **Mobile First**: < 640px optimized touch interface
- **Tablet**: 640px - 1024px adaptive layout
- **Desktop**: > 1024px full-featured experience

### **Mobile Optimizations**
- **Touch Targets**: Minimum 44px touch areas
- **Gesture Support**: Swipe and tap interactions
- **Keyboard Handling**: Smart virtual keyboard management
- **Performance**: Optimized for mobile processors

---

## 🚀 Performance & Optimization

### **Technical Optimizations**
- **Code Splitting**: Lazy loading for optimal bundle sizes
- **Animation Performance**: GPU-accelerated transitions
- **Memory Management**: Proper cleanup and garbage collection
- **Bundle Optimization**: Tree shaking and dead code elimination

### **Best Practices**
- **React Optimization**: memo, useCallback, useMemo usage
- **Efficient Re-rendering**: Minimized component updates
- **Asset Optimization**: Compressed images and optimized fonts
- **Caching Strategy**: Intelligent data caching and persistence

---

## 🛠️ Development

### **Available Scripts**
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build optimized production bundle
npm run preview      # Preview production build locally
npm run lint         # Run ESLint with TypeScript support
```

### **Tech Stack**
- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Lucide React icon library
- **Build Tool**: Vite for fast development and building
- **Date Handling**: date-fns for robust date operations

### **Key Dependencies**
```json
{
  "react": "^18.3.1",
  "typescript": "^5.5.3",
  "framer-motion": "^10.18.0",
  "lucide-react": "^0.344.0",
  "date-fns": "^3.0.6",
  "tailwindcss": "^3.4.1"
}
```

---

## 🌐 Deployment

### **Netlify Deployment**
- **Live URL**: [https://fanciful-moxie-dafc44.netlify.app](https://fanciful-moxie-dafc44.netlify.app)
- **Automatic Builds**: Connected to repository for continuous deployment
- **Edge Network**: Global CDN for optimal performance
- **HTTPS**: Secure SSL certificate included

### **Environment Setup**
- **No Backend Required**: Fully client-side application
- **Local Storage**: Persistent data storage in browser
- **Demo Mode**: No server dependencies for testing

---

## 🔧 Configuration & Customization

### **AI Personality Customization**
Modify `src/services/aiService.ts` to:
- Add new AI personalities
- Customize response patterns
- Adjust gaming difficulty algorithms
- Create specialized conversation flows

### **Theme Customization**
Update `tailwind.config.js` to:
- Modify color schemes
- Adjust spacing systems
- Add custom animations
- Create new component variants

### **Feature Configuration**
Customize in respective component files:
- Message timer durations
- Game difficulty settings
- Notification preferences
- UI animation speeds

---

## 🤝 Contributing

### **Development Workflow**
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Follow TypeScript and ESLint guidelines
4. Test across different screen sizes
5. Commit changes (`git commit -m 'Add amazing feature'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Open Pull Request with detailed description

### **Code Standards**
- **TypeScript**: Strict mode with comprehensive typing
- **ESLint**: Enforced code quality and consistency
- **Component Structure**: Modular, reusable component design
- **Documentation**: Comprehensive inline documentation

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **React Team** - For the incredible framework and ecosystem
- **Framer Motion** - For beautiful, performant animations
- **Tailwind CSS** - For utility-first styling excellence
- **Lucide** - For the comprehensive icon library
- **Pexels** - For high-quality stock photography
- **Netlify** - For seamless deployment and hosting

---

## 📊 Project Stats

- **Components**: 15+ modular React components
- **AI Personalities**: 8 unique conversation partners
- **Features**: 25+ integrated features
- **Lines of Code**: 3000+ TypeScript/TSX
- **Mobile Responsive**: 100% responsive design
- **Performance Score**: Optimized for speed and efficiency

---

<div align="center">
  <h3>🌊 Made with ❤️ and cutting-edge technology</h3>
  <p><em>Bringing AI-powered conversations to life with premium design and functionality</em></p>
  
  **[🚀 Experience Wavely Live](https://fanciful-moxie-dafc44.netlify.app)**
</div>