import { Carousel } from "react-bootstrap";
import { banners } from "../data/orchidBanners.js";

function CarouselBanner() {
    return (
        <Carousel interval={null}>
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
        </Carousel>
    )
}

export default CarouselBanner;