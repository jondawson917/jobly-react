import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
const SearchForm = ({ search }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    search(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  };

  const handleChange = (evt) => {
    setSearchTerm(evt.target.value);
  };

  return (
    <div className="searchform">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Search </Label>
          <Input name="name" value={searchTerm} onChange={handleChange}></Input>
        </FormGroup>
        <Button type="submit">Search Name</Button>
      </Form>
    </div>
  );
};

export default SearchForm;
