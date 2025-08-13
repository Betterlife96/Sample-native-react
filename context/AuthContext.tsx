import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import usersData from '~/assets/data/users.json';

interface User {
  id: number;
  username: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  signup: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const USERS_STORAGE_KEY = '@farmstarter_users';
const CURRENT_USER_KEY = '@farmstarter_current_user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function getStoredUsers(): Promise<User[]> {
  try {
    const stored = await AsyncStorage.getItem(USERS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize with default users if no stored data
    await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usersData));
    return usersData as User[];
  } catch (e) {
    console.error('Error reading users:', e);
    return usersData as User[];
  }
}

async function saveUsers(users: User[]) {
  try {
    await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Error saving users:', e);
  }
}

async function getCurrentUser(): Promise<User | null> {
  try {
    const stored = await AsyncStorage.getItem(CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (e) {
    console.error('Error reading current user:', e);
    return null;
  }
}

async function saveCurrentUser(user: User | null) {
  try {
    if (user) {
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      await AsyncStorage.removeItem(CURRENT_USER_KEY);
    }
  } catch (e) {
    console.error('Error saving current user:', e);
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load persisted user on app start
  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (e) {
        console.error('Error loading user:', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const users = await getStoredUsers();
      const found = users.find((u) => u.username === username && u.password === password);
      if (found) {
        setUser(found);
        await saveCurrentUser(found);
        return true;
      }
      return false;
    } catch (e) {
      Alert.alert('Login Error', 'Could not authenticate. Please try again.');
      return false;
    }
  };

  const signup = async (username: string, password: string) => {
    try {
      const users = await getStoredUsers();
      if (users.find((u) => u.username === username)) {
        return false; // Username already exists
      }
      const newUser = { id: Date.now(), username, password };
      const updated = [...users, newUser];
      await saveUsers(updated);
      setUser(newUser);
      await saveCurrentUser(newUser);
      return true;
    } catch (e) {
      Alert.alert('Signup Error', 'Could not create account. Please try again.');
      return false;
    }
  };

  const logout = async () => {
    setUser(null);
    await saveCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
