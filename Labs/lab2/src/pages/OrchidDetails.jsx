import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Carousel } from 'react-bootstrap';
import { listOfOrchids } from '../data/listOfOrchids';

function OrchidDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const orchid = listOfOrchids.find(o => o.id === parseInt(id));

  if (!orchid) {
    return (
      <Container className="my-5">
        <h2>Orchid not found</h2>
        <Button variant="primary" onClick={() => navigate('/home')}>
          Back to Home
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Button variant="secondary" className="mb-4" onClick={() => navigate(-1)}>
        ← Back to List
      </Button>
      
      <Row>
        <Col md={6}>
          {orchid.images && orchid.images.length > 0 && (
            <img
              src={`/${orchid.images[0]}`}
              alt={orchid.name}
              style={{ width: '100%', height: '500px', objectFit: 'cover' }}
              className="rounded"
            />
          )}
        </Col>
        
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title as="h2">{orchid.name}</Card.Title>
              <div className="mb-3">
                <Badge bg="info" className="me-2">{orchid.category}</Badge>
                {orchid.is_special && <Badge bg="warning">Special Offer</Badge>}
              </div>
              <Card.Text>
                <strong>Description:</strong><br />
                {orchid.description}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default OrchidDetails;