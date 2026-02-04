import { Container, Nav } from 'react-bootstrap'

function Footer() {
    return (
        <footer className="py-3 border-top bg-light mt-auto">
            <Container className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                <span className="text-muted">© 2026 FU News. All rights reserved.</span>
                <Nav className="gap-3">
                    <Nav.Link href="#">About</Nav.Link>
                    <Nav.Link href="#">Contact</Nav.Link>
                    <Nav.Link href="#">Advertise</Nav.Link>
                    <Nav.Link href="#">Privacy</Nav.Link>
                </Nav>
            </Container>
        </footer>
    )
}

export default Footer