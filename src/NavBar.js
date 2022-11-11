import React, { useContext } from "react";

import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from "./UserContext";
import "./NavBar.css";
function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);
  return (
    <>
      <Navbar className="Navigation" expand="md">
        <NavLink exact to="/" className="navbar-brand">
          SinkedIn
        </NavLink>

        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink to="/companies">Companies</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/jobs">Jobs</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/profile">Profile</NavLink>
          </NavItem>
          {currentUser ? (
            <>
              <NavItem>
                <NavLink to="/" onClick={logout}>
                  Logout
                </NavLink>
              </NavItem>
            </>
          ) : (
            <>
              {" "}
              <NavItem>
                <NavLink to="/login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/signup">Sign Up</NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Navbar>
    </>
  );
}

export default NavBar;
