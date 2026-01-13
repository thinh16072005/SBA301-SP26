import { Form } from "react-bootstrap";

function SearchBar({ value = "", onSearchChange }) {
  const handleChange = (e) => onSearchChange(e.target.value);

  return (
    <Form className="mb-3">
      <Form.Group controlId="searchByName">
        <Form.Label>Search by Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Type a name..."
          value={value}
          onChange={handleChange}
        />
      </Form.Group>
    </Form>
  );
}

export default SearchBar;