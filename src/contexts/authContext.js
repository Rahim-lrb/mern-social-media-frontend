import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// const url = 'http://localhost:5000/api';
const url = "https://wex-backend.onrender.com/api"
// const url = "/api"


export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState();

    const getCurrentUser = async () => {
        console.log("get current user")
        try {
            const response = await axios.get(`${url}/users/me`, { withCredentials: true });
            console.log(response.data)
            console.log("we got the currentUser")
            setCurrentUser(response.data);
        } catch (error) {
            console.log("we didn't get the current user")
            console.log(error)
        }
    };

    useEffect(() => {
        getCurrentUser();
    }, []);

    const login = async (credentials) => {
        try {
            const userData = await axios.post(`${url}/auth/login`, credentials, { withCredentials: true });
            await getCurrentUser()
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
        <UserContext.Provider value={{ currentUser, login, logout, signup, getCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};
