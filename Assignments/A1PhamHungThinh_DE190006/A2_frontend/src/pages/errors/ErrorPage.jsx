import { Container, Row, Col, Button, Alert } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'

function ErrorPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const message = location.state?.message || 'Something went wrong. Please try again later.'

  return (
    <Container className="py-5">
      <Row className="justify-content-center text-center">
        <Col md={8} lg={6}>
          <Alert variant="warning" className="mb-4">
            <Alert.Heading>Oops!</Alert.Heading>
            <p className="mb-0">{message}</p>
          </Alert>
          <div className="d-flex gap-2 justify-content-center">
            <Button variant="primary" onClick={() => navigate('/')}>Back to home</Button>
            <Button variant="outline-secondary" onClick={() => navigate(-1)}>Go back</Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ErrorPage
