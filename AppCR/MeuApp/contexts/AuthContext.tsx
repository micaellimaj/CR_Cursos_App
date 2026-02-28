import React, { createContext, useState, useContext, ReactNode } from 'react';
import { LoginResponse } from '../modules/auth/types';

interface AuthContextData {
  user: LoginResponse | null;
  login: (userData: LoginResponse) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LoginResponse | null>(null);

  const login = (userData: LoginResponse) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);