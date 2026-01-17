import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, LoginResponse } from '../types/auth';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string, roles: string[]) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if(storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    },[]);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const login = async (username: string, password: string) => {
        const response = await fetch(`${API_BASE_URL}/api/auth/public/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        if (!response.ok) {
            throw new Error('Login failed');
        }
        const data: LoginResponse = await response.json();
        const loggedInUser: User = {
            username: data.username,
            roles: data.roles,
            jwtToken: data.jwtToken
        };
        setUser(loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        localStorage.setItem('JWT_TOKEN', data.jwtToken);
        return;
    }

    const register = async (username: string, email: string, password: string, roles: string[]) => {
        const response = await fetch(`${API_BASE_URL}/api/auth/public/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password, role: roles}),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Registration failed');
        }

        await login(username, password);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('JWT_TOKEN');
        localStorage.removeItem('CSRF_TOKEN');
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
          {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};