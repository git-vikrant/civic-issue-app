// src/context/AuthContext.jsx
import React, { useState, useEffect, useMemo, useContext } from 'react';
import ApiService from '../services/apiService'; // CORRECTED: Changed '@/services/apiService' to a relative path

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('jwtToken'));
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Memoize the API service instance so it only recreates when the token changes
    const api = useMemo(() => new ApiService(token, setToken, setCurrentUser), [token]);

    const logout = () => {
        setToken(null);
        setCurrentUser(null);
        localStorage.removeItem('jwtToken');
        api.clearToken();
    };

    // Unified login function
    const login = async (usernameOrEmail, password) => {
        const receivedToken = await api.login(usernameOrEmail, password);
        
        setToken(receivedToken);
        localStorage.setItem('jwtToken', receivedToken);

        // Fetch user details immediately after successful login
        const user = await api.fetchCurrentUser();
        setCurrentUser(user);
        return user;
    };

    // Unified register function
    const register = async (username, email, password) => {
        return api.register(username, email, password);
    }


    // Effect to check token validity and fetch user details on initial load
    useEffect(() => {
        const checkAuth = async () => {
            if (token) {
                try {
                    const user = await api.fetchCurrentUser();
                    setCurrentUser(user);
                } catch (error) {
                    console.error("Token verification failed, logging out:", error);
                    logout();
                }
            }
            setIsLoading(false);
        };
        checkAuth();
    }, [token, api]);

    const contextValue = useMemo(() => ({
        token,
        currentUser,
        isLoading,
        logout,
        login,
        register,
        api,
    }), [token, currentUser, isLoading, login, register, api]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);