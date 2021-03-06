import axios from "axios";
import setAuthToken from "../utils";
import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  CL_ERROR,
} from "./userTypes";

// Load User
export const loadUser = () => async (dispatch) => {
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Register
export const register = (user) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/user", user, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    // loadUser();
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data.msg,
    });
  }
};

// Login User
export const login = (formdata, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/auth", formdata, config);
    // localStorage.getItem("token")
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    localStorage.setItem("user", JSON.stringify(res.data.user));

    loadUser();
    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.msg,
    });
  }
};

// Logout
export const logout = () => (dispatch) => dispatch({ type: LOGOUT });
export const clearError = () => (dispatch) => dispatch({ type: CL_ERROR });
