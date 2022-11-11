import React from "react";
import { useHistory } from "react-router-dom";
import useFields from "../hooks/useFields";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const SignupForm = ({ signUp }) => {
  const history = useHistory();
  const [formData, handleChange] = useFields({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let result = await signUp(formData);
    if (!result.token) {
      alert("Couldn't create new user");
    }
    history.push("/jobs");
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            id="username"
            name="username"
            placeholder="Enter username"
            type="username"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            id="password"
            name="password"
            placeholder="enter password"
            type="password"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="firstname">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="enter firstname"
            type="text"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="enter lastname"
            type="text"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="enter email address"
            type="email"
            onChange={handleChange}
          />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default SignupForm;
