import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

export function useLogin() {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const navigate = useNavigate();
    const { state, handleLogin, clearError } = useContext(AuthContext);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setSubmitAttempted(true);

        const isSuccess = handleLogin(loginData);
        
        if (isSuccess) {
            // Login successful - redirect to home
            navigate('/');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: value
        }));
        if (state.error) {
            clearError();
        }
    };

    return {
        loginData,
        submitAttempted,
        state,
        handleFormSubmit,
        handleInputChange
    };
}
