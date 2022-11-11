import React, { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import ProfileForm from "./ProfileForm";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import "./Profile.css";

function Profile() {
  const { currentUser, getUser } = useContext(UserContext);
  const [profile, setProfile] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(
    function generateProfile() {
      async function retrieveUserInfo() {
        if (currentUser) {
          let res = await getUser(currentUser);

          setProfile({
            username: currentUser,
            firstName: res.firstName,
            lastName: res.lastName,
            email: res.email,
            isAdmin: res.isAdmin,
          });
         
        } else {
          console.log("User not logged in");
        }
      }
      retrieveUserInfo();
    },
    [currentUser]
  );

  return (
    <div id="profile">
      <Card>
        {currentUser ? (
          <CardBody>
            <CardTitle className="font-weight-bold text-center">
              {currentUser}'s Profile
            </CardTitle>
            <ListGroup>
              <ListGroupItem>Username: {profile.username}</ListGroupItem>{" "}
              <ListGroupItem>First Name: {profile.firstName}</ListGroupItem>Last
              Name: {profile.lastName}{" "}
              <ListGroupItem>Email: {profile.email}</ListGroupItem>
              {profile.isAdmin ? (
                <ListGroupItem>I'm an Admin</ListGroupItem>
              ) : (
                <ListGroupItem>I'm notan Admin</ListGroupItem>
              )}
            </ListGroup>
          </CardBody>
        ) : null}
      </Card>
      <ProfileForm /></div>
      
  );
}

export default Profile;
