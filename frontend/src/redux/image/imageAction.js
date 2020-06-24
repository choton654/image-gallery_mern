import axios from 'axios';
import {
  ADD_IMAGE,
  ADD_IMAGE_REQUEST,
  DELETE_IMAGE,
  DELETE_IMAGE_ERROR,
  DELETE_IMAGE_REQUEST,
  EDIT_IMAGE,
  EDIT_IMAGE_ERROR,
  EDIT_IMAGE_REQUEST,
  GET_IMAGE,
  GET_IMAGE_ERROR,
  GET_IMAGE_REQUEST,
  GET_ONE_IMAGE,
  GET_ONE_IMAGE_ERROR,
  GET_ONE_IMAGE_REQUEST,
  IMAGE_ERROR,
} from './imageTypes';

// Add Image
export const addImage = (image) => async (dispatch) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  };

  try {
    dispatch({ type: ADD_IMAGE_REQUEST });

    const res = await axios.post('/api/images', image, config);
    dispatch({
      type: ADD_IMAGE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: IMAGE_ERROR,
      payload: err,
    });
  }
};

// get all Images
export const getImages = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    dispatch({ type: GET_IMAGE_REQUEST });

    const res = await axios.get('/api/images', config);
    dispatch({
      type: GET_IMAGE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_IMAGE_ERROR,
      payload: err,
    });
  }
};

// get single image
export const getOneImg = (id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    dispatch({ type: GET_ONE_IMAGE_REQUEST });

    const res = await axios.get(`/api/images/${id}`, config);
    dispatch({
      type: GET_ONE_IMAGE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ONE_IMAGE_ERROR,
      payload: err,
    });
  }
};

// edit image
export const editImage = (image) => async (dispatch) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  };
  try {
    dispatch({ type: EDIT_IMAGE_REQUEST });

    const res = await axios.put(`/api/images/${image._id}`, image, config);
    dispatch({
      type: EDIT_IMAGE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EDIT_IMAGE_ERROR,
      payload: err,
    });
  }
};

// delete image
export const deleteImage = (id) => async (dispatch) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'x-auth-token': token,
    },
  };
  try {
    dispatch({ type: DELETE_IMAGE_REQUEST });

    const res = await axios.delete(`/api/images/${id}`, config);
    dispatch({
      type: DELETE_IMAGE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DELETE_IMAGE_ERROR,
      payload: err,
    });
  }
};
