import {Button, Badge, Card} from 'react-bootstrap';

function Orchid({orchid, handleOpen}) {
    return (
        <div>
            <Card style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
                <Card.Img height={200} src={orchid.images[0]} />
                {orchid.is_special && (
                    <Badge
                        bg="warning"
                        text="dark"
                        className="position-absolute m-2"
                        style={{ top: '8px', left: '8px' }}
                    >
                        Special
                    </Badge>
                )}
                <Card.Body className="d-flex flex-column">
                    <Card.Title className="fs-5 fw-semibold text-center text-truncate" title={`${orchid.id}. ${orchid.name}`}>
                        {orchid.id}. {orchid.name}
                    </Card.Title>
                    <Badge bg="info" className="mb-3 align-self-start">{orchid.category}</Badge>
                    <Button variant="primary" className="mt-auto w-100" onClick={() => handleOpen(orchid)}>
                        View Details
                    </Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Orchid