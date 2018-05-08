import { FETCH_POSTS, NEW_POST } from './types';
export const fetchPosts = () => dispatch => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(posts =>
      dispatch({
        type: FETCH_POSTS,
        payload: posts
      })
    );
};

export const createPost = location => dispatch => {
  fetch('http://127.0.0.1:8000/?location='+location.location+'', {
    method: 'GET',

    headers: {
      'content-type': 'application/json',

    },
  })
    .then(res => res.json())
    .then(post =>
      dispatch({
        type: NEW_POST,
        payload: post
      })
    );
};
