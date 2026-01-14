import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { users } from '../data/userData.js';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        // Validate input fields
        if (!username.trim() || !password.trim()) {
            setError('Please enter both username and password');
            return;
        }

        // Check if user exists and password matches
        const user = users.find(
            (u) => u.username === username && u.password === password
        );

        if (user) {
            // Login successful - redirect to home
            navigate('/home');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <Container className='flex-grow-1 py-5'>
            <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '500px' }}>
                <div style={{ width: '100%', maxWidth: '400px' }}>
                    <h2 className='text-center mb-4'>Login</h2>

                    {error && <Alert variant='danger'>{error}</Alert>}

                    <Form onSubmit={handleLogin}>
                        <Form.Group className='mb-3'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
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