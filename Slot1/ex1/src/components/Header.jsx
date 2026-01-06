import {Button, Container, Nav, Navbar} from "react-bootstrap";

function Header() {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <br/>
            <header>
                <h1>Welcome to my website</h1>
                <Button variant="primary">Click me</Button>
            </header>
        </>
    )
}

export default Header