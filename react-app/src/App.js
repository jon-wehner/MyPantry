import React, { useState, useEffect } from "react";
import {Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./services/auth";
import LandingPage from "./LandingPage";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <NavBar setAuthenticated={setAuthenticated} />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
        </Route>
        <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
          <User />
        </ProtectedRoute>
        <Route path="/" exact={true} authenticated={authenticated}>
          {authenticated ? <h1>Authenticated</h1> : <LandingPage />}
        </Route>
      </Switch>
    </>
  );
}

export default App;
