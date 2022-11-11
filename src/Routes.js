import React from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Profile from "./Routes/Profile";
import LoginForm from "./Routes/LoginForm";
import SignupForm from "./Routes/SignupForm";
import CompanyList from "./Routes/CompanyList";
import CompanyDetails from "./Routes/CompanyDetails";
import JobList from "./Routes/JobList";

import PrivateRoute from "./PrivateRoute"
import NavBar from "./NavBar";
import "./App.css";

function Routes(props) {
  const {login, signUp, logout} = props;
  
  return (
      
      <BrowserRouter>
  
        <NavBar logout={logout}/>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <LoginForm login={login}/>
          </Route>
          <Route exact path="/signup">
            <SignupForm signUp={signUp}/>
          </Route>
          <PrivateRoute exact path="/companies">
            <CompanyList />
          </PrivateRoute>
          <PrivateRoute exact path="/jobs">
            <JobList />
          </PrivateRoute>
          <PrivateRoute exact path="/companies/:handle">
            <CompanyDetails />
          </PrivateRoute>
          <Route exact path="/login">
            <LoginForm />
          </Route>
          <Route exact path="/signup">
            <SignupForm />
          </Route>
          <PrivateRoute exact path="/profile">
            <Profile />
          </PrivateRoute>
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
 
  );
}

export default Routes;
