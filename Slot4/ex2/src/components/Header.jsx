import {Button, Container, Nav, Navbar} from "react-bootstrap";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
function Header() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (query) => {
        setSearchQuery(query);
    };

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand>
                        <NavLink className="nav-link" to="/">Orchid Shop</NavLink>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                        <NavLink className="nav-link" to="/about">About</NavLink>
                        <NavLink className="nav-link" to="/contact">Contact</NavLink>
                    </Nav>
                <SearchBar value={searchQuery} onSearchChange={handleSearchChange} />
                </Container>
            </Navbar>
            <br/>
            <header className="text-center">
                <h1>Orchid Shop</h1>
            </header>
        </>
    )
}

export default Header