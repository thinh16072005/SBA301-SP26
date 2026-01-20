// TODO: Display a list of orchids with their names and images
import { useState, useMemo, useEffect } from 'react';
import { listOfOrchids } from '../data/listOfOrchids';
import { Card, Button, Badge, Row, Col, Container } from 'react-bootstrap';
import FilterSort from './FilterSort';
import { Link } from 'react-router-dom';

function OrchidList({ searchQuery = '', onHomeClick }) {
    {/*Code handleFilterChange và handleSortChange để cập nhật trạng thái lọc và sắp xếp*/ }
    {/*Sử dụng useState để quản lý trạng thái lọc và sắp xếp*/ }
    const [filterCategory, setFilterCategory] = useState('');
    const [sortOption, setSortOption] = useState('');

    // Create a wrapped version of onHomeClick that also resets filters
    const wrappedOnHomeClick = () => {
        setFilterCategory('');
        setSortOption('');
        if (onHomeClick) {
            onHomeClick();
        }
    };

    // Reset filter and sort when searchQuery changes
    useEffect(() => {
        if (searchQuery === '') {
            setFilterCategory('');
            setSortOption('');
        }
    }, [searchQuery]);

    const handleFilterChange = (category) => {
        // Cập nhật trạng thái lọc theo danh mục dùng useState 
        setFilterCategory(category);

    };
    const handleSortChange = (sortOption) => {
        // Cập nhật trạng thái sắp xếp theo tùy chọn  
        setSortOption(sortOption);
    };

    // Lọc và sắp xếp mảng OrchidsData dựa trên trạng thái lọc và sắp xếp
    // Sử dụng useMemo để chỉ tính toán lại khi có thay đổi
    const filteredOrchids = useMemo(() => {
        let filtered = listOfOrchids.filter(orchid =>
            (filterCategory === '' || orchid.category === filterCategory) &&
            orchid.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (sortOption === 'asc') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOption === 'desc') {
            filtered.sort((a, b) => b.name.localeCompare(a.name));
        }

        return filtered;
    }, [filterCategory, searchQuery, sortOption]);

    // Lấy danh sách các danh mục duy nhất từ mảng OrchidsData để truyền vào component FilterSort
    // Sử dụng useMemo để chỉ tính toán lại khi listOfOrchids thay đổi
    const categories = useMemo(() => {
        return [...new Set(listOfOrchids.map(orchid => orchid.category))];
    }, []);

    return (
        <div className="d-flex flex-column min-vh-100">
            <main className="flex-grow-1">
                <Container className="my-4">
                    <FilterSort
                        categories={categories}
                        onFilterChange={handleFilterChange}
                        onSortChange={handleSortChange}
                        onReset={wrappedOnHomeClick}
                        filterCategory={filterCategory}
                        sortOption={sortOption}
                    />

                    <Row className="gy-4" style={{ minHeight: '70vh' }}>
                        {filteredOrchids.length === 0 ? (
                            <Col xs={12}>
                                <div className="text-center text-muted py-5">
                                    No results found.
                                </div>
                            </Col>
                        ) : (
                            filteredOrchids.map((orchid) => (
                                <Col key={orchid.id} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex">
                                    <Card className="flex-fill">
                                        <Card.Img
                                            variant="top"
                                            height={240}
                                            style={{ objectFit: 'cover' }}
                                            src={orchid.images?.[0]}
                                        />
                                        <Card.Body>
                                            <Card.Title>{orchid.name}</Card.Title>
                                            <Badge bg="info" className="m-2">{orchid.category}</Badge>
                                            {orchid.is_special && <Badge bg="warning" className="me-2">Special Offer</Badge>}   
                                            <Card.Text>{orchid.description}</Card.Text>
                                            <div className="mt-auto">
                                                <Button as={Link} variant="primary" to={`/orchid/${orchid.id}`}>
                                                    View Details
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        )}
                    </Row>
                </Container>
            </main>
        </div>
    )
}

export default OrchidList;