import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import CarouselBanner from "./CarouselBanner.jsx";

function Header({ searchQuery, onSearchChange, onHomeClick }) {
    const handleBrandClick = () => {
        if (onHomeClick) {
            onHomeClick();
        }
    };

    return (
        <>
            <CarouselBanner />

            <Navbar bg="dark" data-bs-theme="dark" expand="lg" sticky="top">
                <Container>
                    <Navbar.Brand onClick={handleBrandClick} style={{ cursor: 'pointer' }}>
                        Orchid Shop
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className="nav-link" to="/" onClick={() => onHomeClick?.()}>Home</NavLink>
                            <NavLink className="nav-link" to="/about">About</NavLink>
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </Nav>
                        <SearchBar value={searchQuery} onSearchChange={onSearchChange} />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
        </>
    )
}

export default Header