import {Card, Button, Badge, Container} from 'react-bootstrap';

function Orchid() {
    const OrchidData = {
        "id": "1",
        "orchidName": "Ceasar 4N",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. Morbi cursus consectetur diam, non lobortis massa gravida eu. Duis molestie purus vel ligula suscipit, sit amet iaculis justo tempus. Cras pellentesque urna in feugiat fringilla. Vivamus dictum lacinia nulla, id rhoncus lectus fermentum et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. or sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. or sit amet, consectetur adipiscing elit.",
        "category": "Dendrobium",
        "isSpecial": false,
        "price": 25.00,
        "image": "images/orchid.png"
    }

    return (
        <div>
            <Container className='py-5' style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={OrchidData.image} />
                    <Card.Body>
                        <Card.Text>
                            <h2>{OrchidData.id}. {OrchidData.orchidName}</h2>
                        </Card.Text>
                        <Badge bg="info" className="m-2">{OrchidData.category}</Badge>
                        <Card.Text>{OrchidData.description}</Card.Text>
                        {OrchidData.isSpecial && <Button variant="primary">Special Offer</Button>}
                    </Card.Body>
                </Card>
                </Container>
        </div>
    )
}

export default Orchid;