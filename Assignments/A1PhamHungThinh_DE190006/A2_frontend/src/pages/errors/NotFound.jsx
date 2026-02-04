import { Container, Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()

  return (
    <Container className="py-5">
      <Row className="justify-content-center text-center">
        <Col md={8} lg={6}>
          <div className="display-5 fw-bold mb-3">404</div>
          <h1 className="h3 mb-2">Page not found</h1>
          <p className="text-muted mb-4">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <div className="d-flex gap-2 justify-content-center">
            <Button variant="primary" onClick={() => navigate('/')}>Back to home</Button>
            <Button variant="outline-secondary" onClick={() => navigate(-1)}>Go back</Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFound
