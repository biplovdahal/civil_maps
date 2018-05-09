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
import { combineReducers } from 'redux';
import postReducer from './postReducer';

export default combineReducers({
  posts: postReducer
});
