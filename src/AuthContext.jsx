import React, { createContext, useState, useContext } from 'react';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    if (username === 'mais@email.com' && password === '123' || username === 'ali@email.com' && password === '568' ) {
      setIsAuthenticated(true);
      setUser({ username });
      localStorage.setItem('username', username);
      return true;
    }
    return false;
  };

  // دالة لتسجيل الخروج
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// تعريف `useAuth` الذي يسمح باستخدام السياق في المكونات
export const useAuth = () => {
  return useContext(AuthContext);
};
