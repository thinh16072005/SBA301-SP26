import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

function AdminLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1">
        <Header brand="Admin Console" />
        <Container className="pb-4">
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  )
}

export default AdminLayout
