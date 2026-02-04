import { Container, Row, Col, Card, Button, Badge, Stack } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm border-0 text-center p-4">
            <Card.Body>
              <Badge bg="primary" className="mb-3">FU News</Badge>
              <Card.Title as="h1" className="fw-bold mb-3">Welcome to FU News</Card.Title>
              <Card.Text className="text-secondary mb-4">
                Your campus source for announcements, events, and stories from across FPT University.
              </Card.Text>
              <Stack direction="horizontal" gap={3} className="justify-content-center">
                <Button variant="primary" size="lg" onClick={() => navigate('/login')}>Login</Button>
              </Stack>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Home;