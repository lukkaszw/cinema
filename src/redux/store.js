import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import initialState from './initialState';

import showReducer from './reducers/showRedux';
import moviesReducer from './reducers/moviesRedux';
import moviePageReducer from './reducers/moviePageRedux';
import scheduleReducer from './reducers/scheduleRedux';
import searchPanelReducer from './reducers/searchPanelRedux';
import formsReducer from './reducers/formsRedux';
import authReducer from './reducers/authRedux';
import userReducer from './reducers/userRedux';
import seatsReducer from './reducers/seatsRedux';
import ordersReducer from './reducers/ordersRedux';

const reducers = {
  movies: moviesReducer,
  show: showReducer,
  moviePage: moviePageReducer,
  schedule: scheduleReducer,
  searchPanel: searchPanelReducer,
  formsState: formsReducer,
  auth: authReducer,
  user: userReducer,
  seats: seatsReducer,
  orders: ordersReducer,
};

Object.keys(initialState).forEach(item => {
  if (typeof reducers[item] == 'undefined') {
    reducers[item] = (statePart = null) => statePart;
  }
});

const combinedReducers = combineReducers(reducers);

const additionalMiddlewares = process.env.NODE_ENV === 'production' ? applyMiddleware(thunk) : composeWithDevTools(applyMiddleware(thunk));

export const store = createStore(
  combinedReducers,
  initialState,
  additionalMiddlewares,
);