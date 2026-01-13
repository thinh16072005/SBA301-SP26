// TODO: Display a list of orchids with their names and images
import { useState } from 'react';
import { listOfOrchids } from '../data/listOfOrchids';
import { Card, Button, Badge, Row, Col, Container } from 'react-bootstrap';
import FilterSort from './FilterSort';
import SearchBar from './SearchBar';

function OrchidList() {
    {/*Code handleFilterChange và handleSortChange để cập nhật trạng thái lọc và sắp xếp*/ }
    {/*Sử dụng useState để quản lý trạng thái lọc và sắp xếp*/ }
    const [filterCategory, setFilterCategory] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleFilterChange = (category) => {
        // Cập nhật trạng thái lọc theo danh mục dùng useState 
        setFilterCategory(category);

    };
    const handleSortChange = (sortOption) => {
        // Cập nhật trạng thái sắp xếp theo tùy chọn  
        setSortOption(sortOption);
    };

    const handleSearchChange = (query) => {
        setSearchQuery(query);
    };

    // Lọc và sắp xếp mảng OrchidsData dựa trên trạng thái lọc và sắp xếp
    let filteredOrchids = listOfOrchids.filter(orchid =>
        (filterCategory === '' || orchid.category === filterCategory) &&
        orchid.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (sortOption === 'asc') {
        filteredOrchids.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'desc') {
        filteredOrchids.sort((a, b) => b.name.localeCompare(a.name));
    }

    // Lấy danh sách các danh mục duy nhất từ mảng OrchidsData để truyền vào component FilterSort
    let categories = [...new Set(listOfOrchids.map(orchid => orchid.category))];

    return (
        <div className="d-flex flex-column min-vh-100">
            <main className="flex-grow-1">
                <Container>
                    <SearchBar value={searchQuery} onSearchChange={handleSearchChange} />

                    <FilterSort
                        categories={categories}
                        onFilterChange={handleFilterChange}
                        onSortChange={handleSortChange}
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
                                            <Card.Text>{orchid.description}</Card.Text>
                                            {orchid.is_special && <Button variant="primary">Special Offer</Button>}
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