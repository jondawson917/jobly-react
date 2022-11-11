import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import useFields from "../hooks/useFields";
import { useHistory } from "react-router-dom";


function LoginForm({ login }) {
  const history = useHistory();
  const [formData, handleChange] = useFields({
    username: "",
    password: "",
  });

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let result = await login(formData);
    console.log(result)
    if (!result.token) {
      alert("Couldn't login successfully");
    } 
    history.push("/jobs");
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="Username">Username</Label>
          <Input
            type="username"
            name="username"
            id="username"
            placeholder="username placeholder"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="enter password"
            onChange={handleChange}
          />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default LoginForm;
