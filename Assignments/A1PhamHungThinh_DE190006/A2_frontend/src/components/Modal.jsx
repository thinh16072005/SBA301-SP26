import { Modal as BsModal } from 'react-bootstrap'

function Modal({ isOpen, onClose, title, footer, children }) {
  if (!isOpen) return null
  return (
    <BsModal show={isOpen} onHide={onClose} centered>
      {title && (
        <BsModal.Header closeButton>
          <BsModal.Title>{title}</BsModal.Title>
        </BsModal.Header>
      )}
      <BsModal.Body>{children}</BsModal.Body>
      {footer && <BsModal.Footer>{footer}</BsModal.Footer>}
    </BsModal>
  )
}

export default Modal