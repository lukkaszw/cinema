import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import initialState from './initialState';

import ticketsReducer from './reducers/ticketsRedux/ticketsRedux';
import moviesReducer from './reducers/moviesRedux/moviesRedux';
import moviePageReducer from './reducers/moviePageRedux/moviePageRedux';
import scheduleReducer from './reducers/scheduleRedux/scheduleRedux';

const reducers = {
  movies: moviesReducer,
  tickets: ticketsReducer,
  moviePage: moviePageReducer,
  schedule: scheduleReducer,
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