import {Form, Row, Col, Button} from "react-bootstrap";

function FilterSort({ categories, onFilterChange, onSortChange, onReset, filterCategory = '', sortOption = '' }) {
    
    const handleFilterChange = (e) => {
        onFilterChange(e.target.value);
    }

    const handleSortChange = (e) => {
        onSortChange(e.target.value);
    }

    const handleReset = () => {
        if (onReset) {
            onReset();
        }
    }

    return (
        <Form className="mb-4">
            <Row className="align-items-end">
                {/* Filter by Category */}
                <Col md={5}>
                    <Form.Group controlId="filterCategory">
                        <Form.Label>Filter by Category</Form.Label>
                        <Form.Control as="select" value={filterCategory} onChange={handleFilterChange}>
                            <option value="">All Categories</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>

                {/* Sort by Name */}
                <Col md={5}>
                    <Form.Group controlId="sortOrder">
                        <Form.Label>Sort by Name</Form.Label>
                        <Form.Control as="select" value={sortOption} onChange={handleSortChange}>
                            <option value="">Default</option>
                            <option value="asc">A-Z</option>
                            <option value="desc">Z-A</option>
                        </Form.Control>
                    </Form.Group>
                </Col>

                {/* Reset Button */}
                <Col md={2} className="d-flex justify-content-center mt-3 mt-md-0">
                    <Button variant="outline-secondary" onClick={handleReset}>Reset</Button>
                </Col>
            </Row>
        </Form>
    );
}

export default FilterSort;