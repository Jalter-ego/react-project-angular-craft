import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

interface User {
  name: string;
  given_name: string;
  email: string;
  picture: string;
  credits: number;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (token: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      decodeUserToken(token); 
    }
  }, []);

  const decodeUserToken = (token: string) => {
    try {
      const decodedToken: any = jwtDecode(token);  
      const user: User = {
        name: decodedToken.name,
        given_name: decodedToken.given_name,
        email: decodedToken.email,
        picture: decodedToken.picture,
        credits: decodedToken.credits
      };
      setUser(user);  
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  const login = (token: string) => {
    localStorage.setItem('jwt', token);
    decodeUserToken(token);  
    console.log(user)
};

  const logout = () => {
    localStorage.removeItem('jwt');
    sessionStorage.clear()
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
