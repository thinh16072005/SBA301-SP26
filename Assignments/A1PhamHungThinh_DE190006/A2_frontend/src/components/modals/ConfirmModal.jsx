import { Button } from 'react-bootstrap'
import Modal from '../Modal'

function ConfirmModal({
  show,
  title = 'Confirm',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onClose,
}) {
  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title={title}
      footer={(
        <>
          <Button variant="secondary" onClick={onClose}>{cancelLabel}</Button>
          <Button variant="danger" onClick={onConfirm}>{confirmLabel}</Button>
        </>
      )}
    >
      <p className="mb-0">{message}</p>
    </Modal>
  )
}

export default ConfirmModal
