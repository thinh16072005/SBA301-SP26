import { Alert, Button, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Forbidden() {
  const navigate = useNavigate()

  return (
    <Container className="py-5">
      <Row className="justify-content-center text-center">
        <Col md={8} lg={6}>
          <Alert variant="danger" className="mb-4">
            <Alert.Heading>403 • Forbidden</Alert.Heading>
            <p className="mb-0">You do not have permission to access this page.</p>
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

export default Forbidden
