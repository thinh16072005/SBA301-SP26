import { Carousel, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import CarouselBanner from "./CarouselBanner.jsx";

function Header({ searchQuery, onSearchChange }) {
    // const banners = [
    //     {
    //         id: 1,
    //         image: '/images/banners/b1.jpg',
    //         title: 'Lan hồ điệp',
    //         description: 'Khám phá vẻ đẹp tinh tế của lan hồ điệp với những bông hoa rực rỡ và hương thơm quyến rũ.'
    //     },
    //     {
    //         id: 2,
    //         image: '/images/banners/b2.jpg',
    //         title: 'Lan dendrobium',
    //         description: 'Trải nghiệm sự đa dạng và phong phú của lan dendrobium, từ những bông hoa nhỏ xinh đến những chùm hoa lớn đầy màu sắc.'
    //     },
    //     {
    //         id: 3,
    //         image: '/images/banners/b3.jpg',
    //         title: 'Lan cattleya',
    //         description: 'Thưởng thức vẻ đẹp hoang dã và quyến rũ của lan cattleya, biểu tượng của sự sang trọng và quý phái.'
    //     }
    // ]


    return (
        <>
            {/* <Carousel>
                {banners.map(banner => (
                    <Carousel.Item key={banner.id}>
                        <img
                            className="d-block w-100"
                            src={banner.image}
                            alt={banner.title}
                            style={{ height: '400px', objectFit: 'cover' }}
                        />
                        <Carousel.Caption style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            borderRadius: '10px',
                            padding: '10px'
                        }}
                        >
                            <h3>{banner.title}</h3>
                            <p>{banner.description}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel> */}

            <CarouselBanner />

            <Navbar bg="dark" data-bs-theme="dark" expand="lg" sticky="top">
                <Container>
                    <Navbar.Brand>
                        <NavLink className="nav-link" to="/home">Orchid Shop</NavLink>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className="nav-link" to="/home">Home</NavLink>
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