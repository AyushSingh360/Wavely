import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  MessageCircle, 
  Gamepad2, 
  Volume2,
  Moon,
  Sun,
  Monitor,
  Check,
  Camera,
  Mail,
  Phone,
  Globe,
  Lock,
  Eye,
  EyeOff,
  Trash2,
  Download,
  Upload
} from 'lucide-react';
import { Button } from '../ui/Button';
import { AuthUser } from '../../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: AuthUser;
  onUpdateUser: (updates: Partial<AuthUser>) => void;
  onLogout: () => void;
}

type SettingsTab = 'profile' | 'appearance' | 'notifications' | 'privacy' | 'chat' | 'gaming' | 'data';

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [settings, setSettings] = useState({
    // Profile settings
    name: user.name,
    email: user.email,
    bio: '',
    status: 'online',
    
    // Appearance settings
    theme: 'system',
    fontSize: 'medium',
    compactMode: false,
    animations: true,
    
    // Notification settings
    messageNotifications: true,
    gameInvites: true,
    soundEnabled: true,
    desktopNotifications: true,
    emailNotifications: false,
    
    // Privacy settings
    onlineStatus: true,
    readReceipts: true,
    typingIndicators: true,
    lastSeen: true,
    
    // Chat settings
    enterToSend: true,
    autoSaveReplies: true,
    messagePreview: true,
    emojiSuggestions: true,
    
    // Gaming settings
    autoAcceptGames: false,
    gameSound: true,
    showGameStats: true,
    difficulty: 'medium'
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'gaming', label: 'Gaming', icon: Gamepad2 },
    { id: 'data', label: 'Data', icon: Download }
  ];

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Update user profile if changed
    if (settings.name !== user.name || settings.email !== user.email) {
      onUpdateUser({
        name: settings.name,
        email: settings.email
      });
    }
    
    // Save other settings to localStorage
    localStorage.setItem('wavely_settings', JSON.stringify(settings));
    onClose();
  };

  const handleDeleteAccount = () => {
    localStorage.clear();
    onLogout();
    onClose();
  };

  const exportData = () => {
    const data = {
      user,
      settings,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wavely-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <button className="absolute bottom-0 right-0 p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Picture</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Click the camera icon to update your avatar</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) => handleSettingChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleSettingChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bio
              </label>
              <textarea
                value={settings.bio}
                onChange={(e) => handleSettingChange('bio', e.target.value)}
                placeholder="Tell others about yourself..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                value={settings.status}
                onChange={(e) => handleSettingChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="online">🟢 Online</option>
                <option value="away">🟡 Away</option>
                <option value="busy">🔴 Busy</option>
                <option value="invisible">⚫ Invisible</option>
              </select>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Theme
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'light', label: 'Light', icon: Sun },
                  { value: 'dark', label: 'Dark', icon: Moon },
                  { value: 'system', label: 'System', icon: Monitor }
                ].map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => handleSettingChange('theme', value)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      settings.theme === value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <Icon className="w-6 h-6 mx-auto mb-2 text-gray-600 dark:text-gray-400" />
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Font Size
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'small', label: 'Small' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'large', label: 'Large' }
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => handleSettingChange('fontSize', value)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      settings.fontSize === value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className={`font-medium text-gray-900 dark:text-white ${
                      value === 'small' ? 'text-sm' : value === 'large' ? 'text-lg' : 'text-base'
                    }`}>
                      {label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Compact Mode</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Reduce spacing for more content</p>
                </div>
                <button
                  onClick={() => handleSettingChange('compactMode', !settings.compactMode)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.compactMode ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.compactMode ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Animations</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Enable smooth transitions and effects</p>
                </div>
                <button
                  onClick={() => handleSettingChange('animations', !settings.animations)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.animations ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.animations ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            {[
              { key: 'messageNotifications', label: 'Message Notifications', desc: 'Get notified when you receive new messages', icon: MessageCircle },
              { key: 'gameInvites', label: 'Game Invitations', desc: 'Notifications for game challenges', icon: Gamepad2 },
              { key: 'soundEnabled', label: 'Sound Effects', desc: 'Play sounds for notifications', icon: Volume2 },
              { key: 'desktopNotifications', label: 'Desktop Notifications', desc: 'Show notifications on your desktop', icon: Bell },
              { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email', icon: Mail }
            ].map(({ key, label, desc, icon: Icon }) => (
              <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">{label}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleSettingChange(key, !settings[key as keyof typeof settings])}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings[key as keyof typeof settings] ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      settings[key as keyof typeof settings] ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            {[
              { key: 'onlineStatus', label: 'Show Online Status', desc: 'Let others see when you\'re online', icon: Globe },
              { key: 'readReceipts', label: 'Read Receipts', desc: 'Show when you\'ve read messages', icon: Eye },
              { key: 'typingIndicators', label: 'Typing Indicators', desc: 'Show when you\'re typing', icon: MessageCircle },
              { key: 'lastSeen', label: 'Last Seen', desc: 'Show when you were last active', icon: Phone }
            ].map(({ key, label, desc, icon: Icon }) => (
              <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">{label}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleSettingChange(key, !settings[key as keyof typeof settings])}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings[key as keyof typeof settings] ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      settings[key as keyof typeof settings] ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Danger Zone</h3>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-red-900 dark:text-red-200">Delete Account</h4>
                    <p className="text-xs text-red-700 dark:text-red-300">Permanently delete your account and all data</p>
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'chat':
        return (
          <div className="space-y-6">
            {[
              { key: 'enterToSend', label: 'Enter to Send', desc: 'Press Enter to send messages (Shift+Enter for new line)' },
              { key: 'autoSaveReplies', label: 'Auto-save Replies', desc: 'Automatically save frequently used replies' },
              { key: 'messagePreview', label: 'Message Preview', desc: 'Show message previews in chat list' },
              { key: 'emojiSuggestions', label: 'Emoji Suggestions', desc: 'Show emoji suggestions while typing' }
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">{label}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{desc}</p>
                </div>
                <button
                  onClick={() => handleSettingChange(key, !settings[key as keyof typeof settings])}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings[key as keyof typeof settings] ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      settings[key as keyof typeof settings] ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        );

      case 'gaming':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                AI Difficulty
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'easy', label: 'Easy', desc: 'Casual play' },
                  { value: 'medium', label: 'Medium', desc: 'Balanced challenge' },
                  { value: 'hard', label: 'Hard', desc: 'Expert level' }
                ].map(({ value, label, desc }) => (
                  <button
                    key={value}
                    onClick={() => handleSettingChange('difficulty', value)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      settings.difficulty === value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{label}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {[
                { key: 'autoAcceptGames', label: 'Auto-accept Game Invites', desc: 'Automatically accept game challenges' },
                { key: 'gameSound', label: 'Game Sound Effects', desc: 'Play sounds during games' },
                { key: 'showGameStats', label: 'Show Game Statistics', desc: 'Display win/loss statistics' }
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">{label}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{desc}</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange(key, !settings[key as keyof typeof settings])}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings[key as keyof typeof settings] ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        settings[key as keyof typeof settings] ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'data':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                <div className="flex items-center space-x-3 mb-3">
                  <Download className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h4 className="font-medium text-blue-900 dark:text-blue-200">Export Data</h4>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                  Download all your data including messages, settings, and game statistics.
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={exportData}
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                <div className="flex items-center space-x-3 mb-3">
                  <Upload className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <h4 className="font-medium text-green-900 dark:text-green-200">Import Data</h4>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300 mb-4">
                  Import previously exported data to restore your settings and conversations.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Import Data
                </Button>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Storage Usage</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Messages</span>
                  <span className="text-gray-900 dark:text-white">2.3 MB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Settings</span>
                  <span className="text-gray-900 dark:text-white">0.1 MB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Game Data</span>
                  <span className="text-gray-900 dark:text-white">0.5 MB</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between text-sm font-medium">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-gray-900 dark:text-white">2.9 MB</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
              <div className="flex items-center space-x-3 mb-3">
                <Trash2 className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                <h4 className="font-medium text-yellow-900 dark:text-yellow-200">Clear Data</h4>
              </div>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-4">
                Clear all local data including messages, settings, and game history. This action cannot be undone.
              </p>
              <Button
                variant="danger"
                size="sm"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All Data
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex h-[calc(90vh-120px)]">
              {/* Sidebar */}
              <div className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
                <nav className="space-y-2">
                  {tabs.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id as SettingsTab)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === id
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    {tabs.find(tab => tab.id === activeTab)?.label}
                  </h3>
                  {renderTabContent()}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Changes are saved automatically
              </div>
              <div className="flex space-x-3">
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSave}>
                  <Check className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Delete Confirmation Modal */}
          <AnimatePresence>
            {showDeleteConfirm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/70 flex items-center justify-center p-4"
                onClick={() => setShowDeleteConfirm(false)}
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.9 }}
                  className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-md w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Delete Account
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.
                    </p>
                    <div className="flex space-x-3">
                      <Button
                        variant="ghost"
                        onClick={() => setShowDeleteConfirm(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="danger"
                        onClick={handleDeleteAccount}
                        className="flex-1"
                      >
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};