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
import { FETCH_POSTS, NEW_POST, FETCH_PLACES } from './types';


export const savePlace = myPlace => dispatch =>{

  dispatch({
    type: NEW_POST,
    payload:myPlace.place
  })
}


export const createPost = location => dispatch => {
  fetch('https://vast-beach-76093.herokuapp.com?location='+location.location+'',{
  //fetch('http://127.0.0.1:8000?location='+location.location+'', {
    method: 'GET',

    headers: {
      'content-type': 'application/json',

    },
  })
    .then(res => res.json())
    .then(post  => dispatch({
        type: FETCH_POSTS,
        payload: post
      })
    );
};
