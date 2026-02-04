import { useState } from 'react'
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap'

const mockProfile = {
  name: 'Bao Nguyen',
  email: 'bao@example.com',
  role: 'Reporter',
  desk: 'Politics',
  bio: 'Covering policy, elections, and government transparency.',
}

function Profile() {
  const [profile, setProfile] = useState(mockProfile)
  const [message, setMessage] = useState('')

  const handleChange = (field, value) => setProfile({ ...profile, [field]: value })

  const handleSubmit = (event) => {
    event.preventDefault()
    setMessage('Profile saved locally. Connect API to persist changes.')
  }

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2 className="mb-1">My Profile</h2>
          <p className="text-muted mb-0">Update your byline, desk, and contact details.</p>
        </div>
      </div>

      {message && <Alert variant="success" className="mb-0">{message}</Alert>}

      <Card className="shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="profileName">
                  <Form.Label>Full name</Form.Label>
                  <Form.Control
                    value={profile.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="profileEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="profileRole">
                  <Form.Label>Role</Form.Label>
                  <Form.Control value={profile.role} disabled readOnly />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="profileDesk">
                  <Form.Label>Desk</Form.Label>
                  <Form.Control
                    value={profile.desk}
                    onChange={(e) => handleChange('desk', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="profileBio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={profile.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-end gap-2">
              <Button variant="outline-secondary" type="button" onClick={() => setProfile(mockProfile)}>Reset</Button>
              <Button variant="primary" type="submit">Save changes</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Profile
