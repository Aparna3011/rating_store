import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '@/types';
import { mockApi } from '@/services/mockApi';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode;}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuthStatus = async () => {
      try {
        const { data: userInfo, error } = await window.ezsite.apis.getUserInfo();
        if (!error && userInfo) {
          setUser({
            id: userInfo.ID.toString(),
            name: userInfo.Name,
            email: userInfo.Email,
            address: '',
            role: userInfo.Role || 'user'
          });
        }
      } catch (error) {
        console.log('User not authenticated');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const { error } = await window.ezsite.apis.login({ email, password });
      if (error) throw new Error(error);

      // Get user info after successful login
      const { data: userInfo, error: userError } = await window.ezsite.apis.getUserInfo();
      if (userError) throw new Error(userError);

      const userData: User = {
        id: userInfo.ID.toString(),
        name: userInfo.Name,
        email: userInfo.Email,
        address: '',
        role: userInfo.Role || 'user'
      };

      setUser(userData);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await window.ezsite.apis.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
    }
  };

  const signup = async (userData: Omit<User, 'id' | 'role'> & {password: string;}): Promise<void> => {
    try {
      const { error } = await window.ezsite.apis.register({
        email: userData.email,
        password: userData.password
      });
      if (error) throw new Error(error);

      // Note: After registration, user needs to verify email before login
      // So we don't set the user state here
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-id="6mj4qpm2u" data-path="src/contexts/AuthContext.tsx">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary" data-id="7nbmk3u5t" data-path="src/contexts/AuthContext.tsx"></div>
      </div>);

  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }} data-id="lxa2m4no2" data-path="src/contexts/AuthContext.tsx">
      {children}
    </AuthContext.Provider>);

};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};