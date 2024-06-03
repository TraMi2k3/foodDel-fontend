import { createContext, useEffect, useState } from "react";

export const authContext = createContext();
export const AuthContextProvider = ({ children }) => {
    const url = 'https://fooddel-api.onrender.com';
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    
    const contextValue = {
        url,
        currentUser, 
        setCurrentUser
    }

    useEffect(() => {
        // Persist currentUser only on successful login
        if (currentUser) {
          localStorage.setItem("user", JSON.stringify(currentUser));
        }
      }, [currentUser]);
    
    return (
        <authContext.Provider value={contextValue}>
          {children}
        </authContext.Provider>
    );
}
