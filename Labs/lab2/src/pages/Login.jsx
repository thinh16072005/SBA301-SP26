import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useLogin } from '../hooks/useLogin.jsx';

function Login() {
    const { loginData, submitAttempted, state, handleFormSubmit, handleInputChange } = useLogin();

    return (
        <Container className='flex-grow-1 py-5'>
            <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '500px' }}>
                <div style={{ width: '100%', maxWidth: '400px' }}>
                    <h2 className='text-center mb-4'>Login</h2>

                    {state.error && <Alert variant='danger'>{state.error}</Alert>}

                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group className='mb-3'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter username'
                                name='username'
                                value={loginData.username}
                                onChange={handleInputChange}
                                isInvalid={submitAttempted && !loginData.username.trim()}
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
                                name='password'
                                value={loginData.password}
                                onChange={handleInputChange}
                                isInvalid={submitAttempted && !loginData.password.trim()}
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