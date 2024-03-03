// authContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const url = 'http://localhost:5000/api';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [ isLoadingUser, setIsLoadingUser ] = useState(true);

    useEffect(() => {
        getCurrentUser();
    }, []);


    const getCurrentUser = async () => {
        try {
            const response = await axios.get(`${url}/users/me`, { withCredentials: true });
            setCurrentUser(response.data.user);
        } catch (error) {
            console.error('Error fetching user:', error);
        } finally {
            setIsLoadingUser(false);
        }
    };

    const login = async (credentials) => {
        try {
            const userData = await axios.post(`${url}/auth/login`, credentials, { withCredentials: true });
            getCurrentUser()
            return userData;
        } catch (error) {
            throw new Error(error.message || 'Login failed');
        }
    };
    const signup = async (formData) => {
        try {
            const userData = await axios.post(`${url}/auth/signup`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            getCurrentUser()
            return userData;
        } catch (error) {
            throw new Error(error.message || 'Sign up failed');
        }
    };

    const logout = async () => {
        try {
            await axios.get(`${url}/auth/logout`, { withCredentials: true });
            setCurrentUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <UserContext.Provider value={{ currentUser, login, logout, signup }}>
            {!isLoadingUser && children} {/* Render children only when user data is loaded */}
        </UserContext.Provider>
    );
};
