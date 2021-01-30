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
  LIKE_IMAGE,
  COMM,
} from "./imageTypes";

const initialState = {
  images: [],
  image: {},
  error: null,
  loading: false,
};

export const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_IMAGE_REQUEST:
    case GET_IMAGE_REQUEST:
    case GET_ONE_IMAGE_REQUEST:
    case DELETE_IMAGE_REQUEST:
    case EDIT_IMAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_IMAGE:
      return {
        ...state,
        images: [...state.images, action.payload],
        loading: false,
      };
    case IMAGE_ERROR:
    case GET_IMAGE_ERROR:
    case GET_ONE_IMAGE_ERROR:
    case DELETE_IMAGE_ERROR:
    case EDIT_IMAGE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case GET_IMAGE:
      return {
        ...state,
        images: action.payload,
        loading: false,
      };
    case GET_ONE_IMAGE:
    case LIKE_IMAGE:
    case COMM:
      return {
        ...state,
        image: action.payload,
        images: state.images.map((image) =>
          image._id === action.payload._id ? action.payload : image
        ),
        loading: false,
      };
    case EDIT_IMAGE:
      return {
        ...state,
        images: state.images.map((image) =>
          image._id === action.payload._id ? action.payload : image
        ),
        loading: false,
      };
    case DELETE_IMAGE:
      return {
        ...state,
        images: state.images.filter((image) => image._id !== action.payload),
        loading: false,
      };
    default:
      return state;
  }
};
