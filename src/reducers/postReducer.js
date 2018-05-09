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
import { FETCH_POSTS, NEW_POST, FETCH_PLACES } from '../actions/types';

const initialState = {
  items: [],
  item: {},
  my_places:[],
  new_place:{},
};

export default function(state = initialState, action) {
  switch (action.type) {

    case FETCH_POSTS:
      return {
        ...state,
        items: action.payload
      };
    case NEW_POST:
    console.log('im inside new post??')
      return {
        ...state,
        new_place: action.payload
    };
    case FETCH_PLACES:
      return {
        ...state,
        my_places: action.payload
      }
    default:
      return state;
  }
}
