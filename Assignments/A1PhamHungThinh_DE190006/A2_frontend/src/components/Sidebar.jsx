    import {Nav, Col} from 'react-bootstrap'
    import {NavLink} from "react-router-dom";

function Sidebar() {
  return (
      <Col md={3} lg={2}>
          <Nav variant="pills" className="flex-column">
              <Nav.Link as={NavLink} to="/staff" end className="mb-2">Articles</Nav.Link>
              <Nav.Link as={NavLink} to="/staff/categories" className="mb-2">Categories</Nav.Link>
              <Nav.Link as={NavLink} to="/staff/profile" className="mb-2">Profile</Nav.Link>
          </Nav>
      </Col>
  )
}

export default Sidebar
