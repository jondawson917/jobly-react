import React, { useState, useEffect } from "react";
import Routes from "./Routes/Routes";
import useLocalStorage from "./hooks/useLocalStorage";
import API from "./api/api";
import UserContext from "./UserContext";
import "./App.css";
const jwt = require("jsonwebtoken")

function App() {
  

  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useLocalStorage("token", "");
  const [currentUser, setCurrentUser] = useState({});
  
  const [applicationIds, setApplicationIds] = useState(new Set());

  useEffect(
    function loadUser() {
      async function getCurrentUser() {
        if (token !== 'null') {
          try {
            API.token = token;
            let { username } = jwt.decode(token);
            console.log(username);
            
            let user = await API.getUserInfo(username);
            // user.applications ? setApplicationIds(new Set(user.applications)) : setApplicationIds(new Set());

            setCurrentUser(user);
            
          } catch (e) {
            console.log(e);
            setCurrentUser(null);
            
          }
        }
        setIsLoading(false);
      }
      getCurrentUser();
      
    },
    [token, isLoading]
  );

  const newUser = async (signUpData) => {
    try {
      let res = await API.register(signUpData);
      setToken(res.token);

      setCurrentUser(signUpData);
      return res;
    } catch (e) {
      console.error("Signup failed", e);
    }
  };

  const login = async (loginData) => {
    try {
      let res = await API.login(loginData);
      
      setToken(res.data.token);
      console.log("logindata", loginData)
      setCurrentUser(loginData);

      return res;
    } catch (e) {
      console.error("Login failed", e);
    }
  };

  const getUser = async (username) => {
    let res = await API.getUserInfo(username);

    return res.user;
  };

  const updateUser = async (username, data) => {
    let res = await API.updateUserInfo(currentUser, data);
    return res.user;
  };

  const alreadyApplied = (id)=>{
    console.log(applicationIds);
    return applicationIds.has(id);
  }

  const jobApplication = (id) => {
    if (currentUser) {
      if(alreadyApplied(id)) return;
      let res = API.applyToJob(currentUser, id);
      setApplicationIds(new Set([...applicationIds, id]));
      console.log(res);
      return res;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  };

  if (isLoading) {
    return <h1>Page Loading </h1>;
  }
  return (
    <div className="main">
      <UserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
          getUser,
          updateUser,
          jobApplication, alreadyApplied
        }}
      >
        {currentUser ? (
          <p>
            The current User is <br />
            <b>{currentUser}</b>
          </p>
        ) : null}
        <Routes login={login} signUp={newUser} logout={logout} />
      </UserContext.Provider>
    </div>
  );
}

export default App;
