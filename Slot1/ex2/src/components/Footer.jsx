import {Col, Container, Row, Image} from "react-bootstrap";
function Footer() {
    return (
        //footer có background light và text center
        <footer className="bg-light text-center py-4 mt-auto">
            {/* Sử dụng Container để căn chỉnh nội dung footer, có 1 dòng, 3 cột: Avatar, Tên tác giả, Thông tin liên hệ */}
            <Container fluid>
                <Row className="align-items-center">
                    <Col xs={2}>
                        <Image src="/images/orange_juice.webp" alt="Author Avatar" className="rounded-circle" style={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'cover' }} />
                    </Col>
                    <Col xs={8}>
                        <h5>Tác giả: &copy; thinhph</h5>
                        <small>All rights reserved.</small>
                    </Col>
                    <Col xs={2}>
                        <a href="mailto:hungthinh16072005@gmail.com">My email</a>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer