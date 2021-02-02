import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import ImagePage from "./components/ImagePage";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";
import RegisterPage from "./components/RegisterPage";
import SingleImage from "./components/SingleImage";
import PrivateRoute from "./components/ProtectRoute";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={RegisterPage} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute
            exact
            path="/images/:id/:name?"
            component={SingleImage}
          />
          <Route exact path="/images" component={ImagePage} />
          <Route path="*" component={() => <h1>404 NOT FOUND</h1>} />
        </Switch>
      </div>
    </>
  );
}

export default App;
