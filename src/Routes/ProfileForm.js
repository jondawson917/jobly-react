import React, { useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import useFields from "../hooks/useFields";
import { useHistory } from "react-router-dom";
import UserContext from "../UserContext";

const ProfileForm = () => {
  const { currentUser, updateUser } = useContext(UserContext);
  const history = useHistory();
  const [formData, handleChange] = useFields({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let {firstName, lastName, email} = await updateUser(currentUser, formData);
    console.log(firstName, lastName, email);
    history.push("/profile");
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="firstName">First Name</Label>
          <Input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="enter first Name"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last Name</Label>
          <Input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="enter last Name"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="enter email"
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
};
export default ProfileForm;
