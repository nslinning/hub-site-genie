
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../utils/admin/types';
import { getCurrentUser, loginUser, logoutUser, initializeUsers } from '../utils/admin/storageService';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (email: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    // Initialiser standard brukere
    initializeUsers();
    
    // Sjekk om brukeren allerede er logget inn
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const login = async (email: string): Promise<boolean> => {
    const loggedInUser = loginUser(email);
    
    if (loggedInUser) {
      setUser(loggedInUser);
      toast.success(`Logget inn som ${loggedInUser.name}`);
      return true;
    } else {
      toast.error('Ugyldig e-postadresse');
      return false;
    }
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    toast.success('Du er nå logget ut');
  };

  const value = {
    user,
    isAdmin,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth må brukes innenfor en AuthProvider');
  }
  return context;
};
