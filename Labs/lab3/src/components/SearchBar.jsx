import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { IoMdSearch } from "react-icons/io";

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
    <Form onSubmit={handleSubmit} className="d-flex w-100" style={{ maxWidth: '300px' }}>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Search orchids..."
          value={inputValue}
          onChange={handleChange}
        />
        <Button variant="outline-light" type="submit">
          <IoMdSearch />
        </Button>
      </InputGroup>
    </Form>
  );
}

export default SearchBar;