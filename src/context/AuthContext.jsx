// src/context/AuthContext.jsx
import React, { createContext, useState } from "react";

// ✅ 1. Create Auth Context
const AuthContext = createContext();

// ✅ 2. Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fake login for demo
  const login = (email, password) => {
    if (email && password) {
      setUser({ email });
    }
  };
  
  const logout = () => setUser(null);
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ 3. Custom Hook for easier access
// const useAuth = () => useContext(AuthContext);

export default AuthContext;