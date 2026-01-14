import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

function SearchBar({ onSearchChange }) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchChange(inputValue);
  };

  return (
    <Form onSubmit={handleSubmit} className="d-flex">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Search orchids..."
          value={inputValue}
          onChange={handleChange}
        />
        <Button variant="outline-light" type="submit">
          Search
        </Button>
      </InputGroup>
    </Form>
  );
}

export default SearchBar;