import React, { createContext, useContext, useEffect, useState } from 'react'
import auth from '../config/firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState({})

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
      });
  
      return unsubscribe;
  }, [user]);
  
    return (
      <AuthContext.Provider value={[user, setUser]}>
        {children}
      </AuthContext.Provider>
    );
  }