import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { imageReducer } from './image/imageReducer';
import { userReducer } from './user/userReducer';

const initialState = {};

const rootReducer = combineReducers({
  User: userReducer,
  Image: imageReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk)),
);

export default store;
