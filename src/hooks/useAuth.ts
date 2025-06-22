import { useState, useCallback, useEffect } from 'react';
import { AuthUser, AuthState } from '../types';

const STORAGE_KEY = 'wavely_auth_user';

// Mock user profiles for demo
const mockUserProfiles = [
  {
    name: 'Alex Johnson',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    name: 'Sarah Chen',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    name: 'Marcus Williams',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    name: 'Emma Davis',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    name: 'David Rodriguez',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  }
];

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  // Check for existing session on mount
  useEffect(() => {
    const checkExistingAuth = () => {
      try {
        const storedUser = localStorage.getItem(STORAGE_KEY);
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setAuthState({
            user: {
              ...user,
              createdAt: new Date(user.createdAt)
            },
            isAuthenticated: true,
            isLoading: false
          });
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    // Simulate loading time for better UX
    setTimeout(checkExistingAuth, 1000);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simple validation
    if (!email || !password) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: 'Please fill in all fields' };
    }

    if (!email.includes('@')) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: 'Please enter a valid email address' };
    }

    if (password.length < 6) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: 'Password must be at least 6 characters' };
    }

    // Create mock user
    const randomProfile = mockUserProfiles[Math.floor(Math.random() * mockUserProfiles.length)];
    const user: AuthUser = {
      id: Date.now().toString(),
      name: randomProfile.name,
      email,
      avatar: randomProfile.avatar,
      createdAt: new Date()
    };

    // Store in localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));

    setAuthState({
      user,
      isAuthenticated: true,
      isLoading: false
    });

    return { success: true };
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simple validation
    if (!name || !email || !password) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: 'Please fill in all fields' };
    }

    if (name.length < 2) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: 'Name must be at least 2 characters' };
    }

    if (!email.includes('@')) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: 'Please enter a valid email address' };
    }

    if (password.length < 6) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: 'Password must be at least 6 characters' };
    }

    // Create user with provided name
    const randomProfile = mockUserProfiles[Math.floor(Math.random() * mockUserProfiles.length)];
    const user: AuthUser = {
      id: Date.now().toString(),
      name,
      email,
      avatar: randomProfile.avatar,
      createdAt: new Date()
    };

    // Store in localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));

    setAuthState({
      user,
      isAuthenticated: true,
      isLoading: false
    });

    return { success: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  }, []);

  return {
    ...authState,
    login,
    signup,
    logout
  };
};