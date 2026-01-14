import {Button, Container, Nav, Navbar} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";

function Header({ searchQuery, onSearchChange }) {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand>
                        <NavLink className="nav-link" to="/home">Orchid Shop</NavLink>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <NavLink className="nav-link" to="/home">Home</NavLink>
                        <NavLink className="nav-link" to="/about">About</NavLink>
                        <NavLink className="nav-link" to="/contact">Contact</NavLink>
                    </Nav>
                    <SearchBar value={searchQuery} onSearchChange={onSearchChange} />
                </Container>
            </Navbar>
            <br/>
        </>
    )
}

export default Header