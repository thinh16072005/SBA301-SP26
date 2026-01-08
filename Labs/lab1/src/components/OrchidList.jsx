import { useState } from 'react';
import { listOfOrchids } from '../data/listOfOrchids';
import { Row, Col, Container, Modal } from 'react-bootstrap';
import Orchid from './Orchid';
import OrchidModal from './OrchidModal';

function OrchidList() {
    const [selectedOrchid, setSelectedOrchid] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleOpen = (orchid) => {
        setSelectedOrchid(orchid);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedOrchid(null);
    };

    return (
        <Container>
            <Row>
                {listOfOrchids.map((orchid) => (
                    <Col key={orchid.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <Orchid orchid={orchid} handleOpen={handleOpen} />
                    </Col>
                ))}
            </Row>

            <OrchidModal showModal={showModal} selectedOrchid={selectedOrchid} handleClose={handleClose} />
        </Container>
    )
}

export default OrchidList