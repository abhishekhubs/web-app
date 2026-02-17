import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
    fullName: string;
    email: string;
    phone: string;
    password: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    currentUser: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (user: User) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = '@farm_investment_users';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    // Load stored users from AsyncStorage
    const getUsers = async (): Promise<User[]> => {
        try {
            const usersJson = await AsyncStorage.getItem(USERS_STORAGE_KEY);
            return usersJson ? JSON.parse(usersJson) : [];
        } catch (error) {
            console.error('Error loading users:', error);
            return [];
        }
    };

    // Save users to AsyncStorage
    const saveUsers = async (users: User[]): Promise<void> => {
        try {
            await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
        } catch (error) {
            console.error('Error saving users:', error);
        }
    };

    // Initialize with default user if no users exist
    useEffect(() => {
        const initializeDefaultUser = async () => {
            const users = await getUsers();
            if (users.length === 0) {
                // Add default user
                const defaultUser: User = {
                    fullName: 'Abhishek Shrivastav',
                    email: 'abhisheksit27@gmail.com',
                    phone: '9876543210',
                    password: '1234'
                };
                await saveUsers([defaultUser]);
            }
        };
        initializeDefaultUser();
    }, []);

    // Register a new user
    const register = async (user: User): Promise<boolean> => {
        try {
            const users = await getUsers();

            // Check if email already exists
            const emailExists = users.some(u => u.email.toLowerCase() === user.email.toLowerCase());
            if (emailExists) {
                return false; // Email already registered
            }

            // Add new user
            users.push(user);
            await saveUsers(users);

            // Auto-login after registration
            setCurrentUser(user);
            setIsAuthenticated(true);

            return true;
        } catch (error) {
            console.error('Error registering user:', error);
            return false;
        }
    };

    // Login user
    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const users = await getUsers();

            // Find user with matching email and password
            const user = users.find(
                u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
            );

            if (user) {
                setCurrentUser(user);
                setIsAuthenticated(true);
                return true;
            }

            return false; // Invalid credentials
        } catch (error) {
            console.error('Error logging in:', error);
            return false;
        }
    };

    // Logout user
    const logout = () => {
        setCurrentUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, currentUser, login, register, logout }}>
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
