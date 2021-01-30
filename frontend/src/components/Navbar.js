import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/user/userAction";

const Navbar = () => {
  const User = useSelector((state) => state.User);
  const { isAuthenticated, user } = User;

  const dispatch = useDispatch();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span>Home</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto">
            {isAuthenticated ? (
              <>
                {/* <li className="nav-item">
                  <Link className="nav-link" to="/createimage">
                    Create Image
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/images">
                    Images{" "}
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/"
                    onClick={() => dispatch(logout())}
                  >
                    Log Out
                  </Link>
                </li> */}
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Log In
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
