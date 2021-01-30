import decode from "jwt-decode";
import React from "react";
import { useHistory } from "react-router-dom";

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const history = useHistory();
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    try {
      decode(token);
    } catch (err) {
      window.location.hash = "/login";
      return false;
    }
    return true;
  };

  if (!isAuthenticated() && location.pathname !== `/login`) {
    history.push("/login");
    return null;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
