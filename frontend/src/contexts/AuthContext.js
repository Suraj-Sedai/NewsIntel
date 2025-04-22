// src/contexts/AuthContext.js
import React, { createContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // initialize token from storage
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user,  setUser ] = useState(
    token ? jwtDecode(token) : null
  );

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(jwtDecode(newToken));
  };

  const logout = () => {
    console.log('🔒 logging out…');
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
