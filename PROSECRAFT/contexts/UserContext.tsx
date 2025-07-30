import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  location?: string;
  memberSince: string;
  subscription: 'Free' | 'Pro' | 'Enterprise';
  usageStats: {
    documentsCreated: number;
    wordsAnalyzed: number;
    grammarChecks: number;
    styleEnhancements: number;
  };
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  updateUsageStats: (stats: Partial<User['usageStats']>) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock user data - replace with real API calls
const mockUser: User = {
  id: '1',
  name: 'Ethan Thompson',
  email: 'ethan.thompson@email.com',
  avatar: require('../app/assets/images/prosecraft1-logo.png'),
  location: 'San Francisco, CA',
  memberSince: 'March 2024',
  subscription: 'Pro',
  usageStats: {
    documentsCreated: 47,
    wordsAnalyzed: 12450,
    grammarChecks: 23,
    styleEnhancements: 15
  }
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticatedState] = useState(false);
  const [isLoading, setIsLoadingState] = useState(true);

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  const loadUserFromStorage = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        setUserState(userData);
        setIsAuthenticatedState(true);
      } else {
        // Set default user for demo purposes
        setUserState(mockUser);
        setIsAuthenticatedState(true);
        await saveUserToStorage(mockUser);
      }
    } catch (error) {
      console.log('Error loading user from storage:', error);
      // Set default user even if there's an error
      setUserState(mockUser);
      setIsAuthenticatedState(true);
      await saveUserToStorage(mockUser);
    } finally {
      setIsLoadingState(false);
    }
  };

  const saveUserToStorage = async (userData: User) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.log('Error saving user to storage:', error);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoadingState(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any email/password
      setUserState(mockUser);
      setIsAuthenticatedState(true);
      await saveUserToStorage(mockUser);
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoadingState(false);
    }
  };

  const register = async (userData: Partial<User>): Promise<void> => {
    setIsLoadingState(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name || 'New User',
        email: userData.email || '',
        avatar: mockUser.avatar,
        location: userData.location || 'Unknown',
        memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        subscription: 'Free',
        usageStats: {
          documentsCreated: 0,
          wordsAnalyzed: 0,
          grammarChecks: 0,
          styleEnhancements: 0
        }
      };
      
      setUserState(newUser);
      setIsAuthenticatedState(true);
      await saveUserToStorage(newUser);
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setIsLoadingState(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoadingState(true);
    try {
      await AsyncStorage.removeItem('user');
      setUserState(null);
      setIsAuthenticatedState(false);
    } catch (error) {
      console.log('Error during logout:', error);
    } finally {
      setIsLoadingState(false);
    }
  };

  const updateUser = async (updates: Partial<User>): Promise<void> => {
    if (!user) return;
    
    try {
      const updatedUser = { ...user, ...updates };
      setUserState(updatedUser);
      await saveUserToStorage(updatedUser);
    } catch (error) {
      console.log('Error updating user:', error);
    }
  };

  const updateUsageStats = async (stats: Partial<User['usageStats']>): Promise<void> => {
    if (!user) return;
    
    try {
      const updatedStats = { ...user.usageStats, ...stats };
      const updatedUser = { ...user, usageStats: updatedStats };
      setUserState(updatedUser);
      await saveUserToStorage(updatedUser);
    } catch (error) {
      console.log('Error updating usage stats:', error);
    }
  };

  const value: UserContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    updateUsageStats,
  };

  return React.createElement(UserContext.Provider, { value }, children);
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 