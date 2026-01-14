import {Form, Row, Col} from "react-bootstrap";

function FilterSort({ categories, onFilterChange, onSortChange }) {
    
    const handleFilterChange = (e) => {
        onFilterChange(e.target.value);
    }

    const handleSortChange = (e) => {
        onSortChange(e.target.value);
    }

    return (
        <Form className="mb-4">
            <Row>
                {/* Filter by Category */}
                <Col md={6}>
                    <Form.Group controlId="filterCategory">
                        <Form.Label>Filter by Category</Form.Label>
                        <Form.Control as="select" onChange={handleFilterChange}>
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
                <Col md={6}>
                    <Form.Group controlId="sortOrder">
                        <Form.Label>Sort by Name</Form.Label>
                        <Form.Control as="select" onChange={handleSortChange}>
                            <option value="asc">A-Z</option>
                            <option value="desc">Z-A</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
}

export default FilterSort;