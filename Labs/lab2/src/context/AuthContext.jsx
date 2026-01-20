import { createContext, useReducer } from "react";
import { loginReducer } from "../store/login/loginReducer";
import { users } from "../data/userData.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const initialState = {
        isAuthenticated: false,
        user: null,
        token: null,
        error: ''
    };

    const [state, dispatch] = useReducer(loginReducer, initialState);

    const handleLogin = (loginData) => {
        // Validate input fields
        if (!loginData.username.trim() || !loginData.password.trim()) {
            return false;
        }

        // Check if user exists and password matches
        const user = users.find(
            (u) => u.username === loginData.username && u.password === loginData.password
        );

        if (user) {
            // Dispatch LOGIN action with user data
            dispatch({ type: 'LOGIN_SUCCESS', payload: user });
            return true;
        } else {
            // Dispatch LOGIN_FAILURE action with error message
            dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid username or password' });
            return false;
        }
    };

    const clearError = () => {
        dispatch({ type: 'LOGIN_FAILURE', payload: '' });
    };

    return (
        <AuthContext.Provider value={{ state, dispatch, handleLogin, clearError }}>
            {children}
        </AuthContext.Provider>
    );
}