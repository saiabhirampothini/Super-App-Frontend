import React, { createContext, useState } from "react";

// Create a Context for authentication
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const setuser = (user) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, setuser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
