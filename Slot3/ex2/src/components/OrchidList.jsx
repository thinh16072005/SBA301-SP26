// TODO: Display a list of orchids with their names and images
import { listOfOrchids } from '../data/listOfOrchids';
import { Card, Button, Badge, Row, Col, Container } from 'react-bootstrap';

function OrchidList() {
    return (
        <Container>
            <Row>
                {listOfOrchids.map((orchid) => (
                    <Col key={orchid.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <Card style={{ height: '100%' }}>
                            <Card.Img variant="top" height={400} src={orchid.images[0]} />
                            <Card.Body>
                                <Card.Text>
                                    <h2>{orchid.id}. {orchid.name}</h2>
                                </Card.Text>
                                <Badge bg="info" className="m-2">{orchid.category}</Badge>
                                <Card.Text>{orchid.description}</Card.Text>
                                {orchid.is_special && <Button variant="primary">Special Offer</Button>}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default OrchidList;