import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { accountService } from '../services/accountService'

function Header({ brand, color = 'primary' }) {
    const navigate = useNavigate()

    const handleLogout = () => {
        accountService.logout()
        navigate('/login')
    }

    return (
        <Navbar bg={color} data-bs-theme="dark" className="mb-0">
            <Container className="d-flex justify-content-between align-items-center">
                <Navbar.Brand>{brand}</Navbar.Brand>
                {accountService.isAuthenticated() && (
                    <div className="d-flex align-items-center gap-3">
                        <span className="text-light small">{accountService.getAccountName()}</span>
                        <Button variant="outline-light" size="sm" onClick={handleLogout}>
                            Sign out
                        </Button>
                    </div>
                )}
            </Container>
        </Navbar>
    )
}

export default Header