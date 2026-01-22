import { Modal, Button, Form } from 'react-bootstrap';

function FormModal({ 
    show, 
    title, 
    body, 
    onConfirm, 
    onCancel,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    confirmVariant = 'primary',
    size = 'lg',
    children
}) {
    return (
        <Modal show={show} onHide={onCancel} size={size}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children || body}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    {cancelText}
                </Button>
                <Button variant={confirmVariant} onClick={onConfirm}>
                    {confirmText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default FormModal;