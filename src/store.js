/**
 * postActions.js

 * Have a nice day.
 *
 *
 * @author  Biplov Dahal, https://github.com/biplovdahal/
 * @updated 05-08-2018

 *
 *
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),

  )
);

export default store;
