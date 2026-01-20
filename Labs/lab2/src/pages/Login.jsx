import { useState, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { users } from '../data/userData.js';
import { loginReducer } from '../store/login/loginReducer.js';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const navigate = useNavigate();

    const initialState = {
        isAuthenticated: false,
        user: null,
        error: ''
    };

    // Use useReducer for login state management
    const [state, dispatch] = useReducer(loginReducer, initialState);

    const handleLogin = (e) => {
        e.preventDefault();
        setSubmitAttempted(true);

        // Validate input fields
        if (!username.trim() || !password.trim()) {
            return;
        }

        // Check if user exists and password matches
        const user = users.find(
            (u) => u.username === username && u.password === password
        );

        if (user) {
            // Dispatch LOGIN action with user data
            dispatch({ type: 'LOGIN', payload: user });
            // Login successful - redirect to home
            navigate('/');
        } else {
            // Dispatch LOGIN_FAILURE action with error message
            dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid username or password' });
        }
    };

    return (
        <Container className='flex-grow-1 py-5'>
            <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '500px' }}>
                <div style={{ width: '100%', maxWidth: '400px' }}>
                    <h2 className='text-center mb-4'>Login</h2>

                    {state.error && <Alert variant='danger'>{state.error}</Alert>}

                    <Form onSubmit={handleLogin}>
                        <Form.Group className='mb-3'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter username'
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    if (state.error) {
                                        dispatch({ type: 'LOGIN_FAILURE', payload: '' });
                                    }
                                }}
                                isInvalid={submitAttempted && !username.trim()}
                            />
                            <Form.Control.Feedback type='invalid'>
                                Please enter a username.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter password'
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (state.error) {
                                        dispatch({ type: 'LOGIN_FAILURE', payload: '' });
                                    }
                                }}
                                isInvalid={submitAttempted && !password.trim()}
                            />
                            <Form.Control.Feedback type='invalid'>
                                Please enter a password.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button variant='primary' type='submit' className='w-100'>
                            Login
                        </Button>
                    </Form>
                </div>
            </div>
        </Container>
    );
}

export default Login;