import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { accountService } from '../services/accountService.js';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitAttempted(true);

    if (!form.email.trim() || !form.password.trim()) {
      return;
    }

    accountService.login(form.email, form.password)
      .then((auth) => {
        const role = auth.accountRole
        if (role === 1) {
          navigate('/admin')
        } else if (role === 2) {
          navigate('/staff')
        } else {
          navigate('/')
        }
      })
      .catch(() => setError('Incorrect email or password. Please try again.'))
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="mb-3 text-center">Sign in</h3>
              {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={form.email}
                    onChange={handleChange}
                    isInvalid={submitAttempted && !form.email.trim()}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter an email.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={form.password}
                    onChange={handleChange}
                    isInvalid={submitAttempted && !form.password.trim()}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a password.
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;