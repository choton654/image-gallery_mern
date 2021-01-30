import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { clearError, login } from "../redux/user/userAction";

const LoginPage = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const User = useSelector((state) => state.User);

  const { loading, isAuthenticated, error } = User;
  const dispatch = useDispatch();
  const history = useHistory();
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     props.history.push("/images");
  //   }
  // }, [isAuthenticated]);

  const handelChange = (e) => {
    dispatch(clearError());
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    console.log(user);
    // const { name, email, password } = user;
    dispatch(login(user, history));

    setUser({
      email: "",
      password: "",
    });
  };

  return (
    <div className="container py-4">
      {error && (
        <div className="text-center">
          <h2 className="text-light">{error}</h2>
        </div>
      )}
      (
      <div>
        <h2 style={{ color: "#fff" }}>Login</h2>
        <form onSubmit={handelSubmit}>
          <div className="form-group">
            <label className="text-light" htmlFor="exampleInputEmail1">
              Email address
            </label>
            <input
              type="email"
              onChange={handelChange}
              name="email"
              value={user.email}
              className="form-control"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="form-group">
            <label className="text-light" htmlFor="exampleInputPassword1">
              Password
            </label>
            <input
              type="password"
              onChange={handelChange}
              name="password"
              value={user.password}
              className="form-control"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <div>
          <div style={{ color: "#fff" }}>New user?</div>
          <Link to="/signup">
            <span>SignUp</span>
          </Link>
        </div>
      </div>
      )
    </div>
  );
};

export default LoginPage;
