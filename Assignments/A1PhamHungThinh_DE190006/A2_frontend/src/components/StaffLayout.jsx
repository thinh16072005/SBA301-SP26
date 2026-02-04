import { Container, Nav, Navbar } from 'react-bootstrap'
import { Col, Row } from 'react-bootstrap'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import Header from './Header'
import Sidebar from "./Sidebar.jsx";

function StaffLayout() {
  const navigate = useNavigate()
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header brand="FU NEWS Staff Console" color="dark" />
      <main className="flex-grow-1">
        <Container fluid className="py-4">
          <Row className="g-4">
            <Sidebar/>
            <Col md={9} lg={10}>
              <Outlet />
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  )
}

export default StaffLayout
