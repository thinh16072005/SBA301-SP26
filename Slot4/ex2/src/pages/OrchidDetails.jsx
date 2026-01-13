import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Carousel } from 'react-bootstrap';
import {listOfOrchids} from '../data/listOfOrchids';

function OrchidDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const orchid = listOfOrchids.find(o => o.id === parseInt(id));

  if (!orchid) {
    return (
      <Container className="my-5">
        <h2>Orchid not found</h2>
        <Button variant="primary" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Button variant="secondary" className="mb-4" onClick={() => navigate('/')}>
        ← Back to List
      </Button>
      
      <Row>
        <Col md={6}>
          <Carousel>
            {orchid.images?.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={`/${image}`}
                  alt={`${orchid.name} - ${index + 1}`}
                  style={{ height: '500px', objectFit: 'cover' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
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
                <strong>Origin:</strong> {orchid.origin}
              </Card.Text>
              
              <Card.Text>
                <strong>Color:</strong> {orchid.color}
              </Card.Text>
              
              <Card.Text>
                <strong>Description:</strong><br />
                {orchid.description}
              </Card.Text>
              
              <h4 className="text-primary mt-4">Rating: {orchid.rating} / 5</h4>
              
              <Button variant="success" size="lg" className="mt-3">
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default OrchidDetails;