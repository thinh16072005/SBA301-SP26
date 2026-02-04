import { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import Modal from '../Modal'

function AccountModal({ show, onClose, onSubmit, initialData = null }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [role, setRole] = useState(2)

  useEffect(() => {
    if (!show) return
    setSubmitAttempted(false)
    setUsername(initialData?.username || '')
    setEmail(initialData?.email || '')
    setPassword('')
    setRole(initialData?.role || 2)
  }, [show, initialData])

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitAttempted(true)

    if (!username.trim() || !email.trim() || !password.trim() || !role) {
      return
    }

    onSubmit({ id: initialData?.id, username, email, password, role })
  }

  const formId = 'add-account-form'

  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title={initialData?.id ? 'Edit Account' : 'Add Account'}
      footer={(
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" type="submit" form={formId}>Save</Button>
        </>
      )}
    >
      <Form id={formId} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="accountUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter username"
            isInvalid={submitAttempted && !username.trim()}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a username.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="accountEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@example.com"
            isInvalid={submitAttempted && !email.trim()}
          />
          <Form.Control.Feedback type="invalid">
            Please enter an email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="accountPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              isInvalid={submitAttempted && !password.trim()}
          />
          <Form.Control.Feedback type="invalid">
            Please enter the password.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="accountRole">
          <Form.Label>Role</Form.Label>
          <Form.Select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            isInvalid={submitAttempted && !role}
          >
            <option value="1">Admin</option>
            <option value="2">Staff</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please select a role.
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
    </Modal>
  )
}

export default AccountModal
