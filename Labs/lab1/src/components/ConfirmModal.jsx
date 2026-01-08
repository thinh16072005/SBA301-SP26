import { Modal, Button, Badge } from 'react-bootstrap'

function ConfirmModal({ showModal, selectedOrchid, handleClose }) {
    return (
        <>
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {selectedOrchid ? `${selectedOrchid.id}. ${selectedOrchid.name}` : 'Orchid Details'}
                    </Modal.Title>
                </Modal.Header>

                {/* Display Orchid Details */}
                {selectedOrchid && (
                    <>
                        <Modal.Body>
                            <img
                                src={selectedOrchid.images[0]}
                                alt={selectedOrchid.name}
                                style={{ width: '100%', borderRadius: '8px' }}
                            />
                            <p className="mt-3">{selectedOrchid.description}</p>
                            <div className="d-flex gap-2 align-items-center">
                                <Badge bg="info">{selectedOrchid.category || 'Orchid'}</Badge>
                                {selectedOrchid.is_special && <Badge bg="warning" text="dark">Special</Badge>}
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </>
                )}
            </Modal>
        </>
    )
}

export default ConfirmModal