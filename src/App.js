import React, { useState, useEffect } from "react";
import Routes from "./Routes";
import { decodeToken } from "./backend/helpers/tokens";
import useLocalStorage from "./hooks/useLocalStorage";
import JoblyApi from "./backend/api/api";
import UserContext from "./UserContext";
import "./App.css";

const DEFAULT_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";
function App() {
  

  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useLocalStorage("token", DEFAULT_TOKEN);
  const [currentUser, setCurrentUser] = useState(null);
  /*Unfinished setting applications */
  const [applicationIds, setApplicationIds] = useState(new Set());

  useEffect(
    function loadUser() {
      async function getCurrentUser() {
        if (token) {
          try {
            let { username } = decodeToken(token);
            console.log(username);
            JoblyApi.token = token;
            let user = await getUser(username);
            setApplicationIds(new Set(user.applications));

            setCurrentUser(username);
            console.log(applicationIds);
          } catch (e) {
            console.log(e);
            setCurrentUser(null);
            setIsLoading(false);
          }
        }
        setIsLoading(true);
      }
      getCurrentUser();
      setIsLoading(false);
    },
    [token]
  );

  const newUser = async (signUpData) => {
    try {
      let res = await JoblyApi.register(signUpData);
      setToken(res.token);

      setCurrentUser(signUpData);
      return res;
    } catch (e) {
      console.error("Signup failed", e);
    }
  };

  const login = async (loginData) => {
    try {
      let res = await JoblyApi.login(loginData);
      setToken(res.token);

      setCurrentUser(loginData);

      return res;
    } catch (e) {
      console.error("Login failed", e);
    }
  };

  const getUser = async (username) => {
    let res = await JoblyApi.getUserInfo(username);

    return res.user;
  };

  const updateUser = async (username, data) => {
    let res = await JoblyApi.updateUserInfo(currentUser, data);
    return res.user;
  };

  const alreadyApplied = (id)=>{
    console.log(applicationIds);
    return applicationIds.has(id);
  }

  const jobApplication = (id) => {
    if (currentUser) {
      if(alreadyApplied(id)) return;
      let res = JoblyApi.applyToJob(currentUser, id);
      setApplicationIds(new Set([...applicationIds, id]));
      console.log(res);
      return res;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  };

  // if (isLoading) {
  //   return <h1>Page Loading </h1>;
  // }
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
