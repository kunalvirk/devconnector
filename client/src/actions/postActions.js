import axios from 'axios';

import {
    ADD_POST,
    GET_POSTS,
    GET_POST,
    LOADING_POST,
    THROW_ERR,
    DELETE_POST
}
from './actions_const'

// Add Post
export const addPost = postData => dispatch => {
    axios
      .post('/api/post', postData)
      .then(res =>
        dispatch({
          type: ADD_POST,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: THROW_ERR,
          payload: err.response.data
        })
      );
};

export const addComment = (postId, comment) => dispatch => {
  axios
    .post(`/api/post/comment/${postId}`, comment)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: THROW_ERR,
        payload: err.response.data
      })
    );
};

export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/post/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: THROW_ERR,
        payload: err.response.data
      })
    );
};

export const getPosts = () => dispatch => {
    dispatch(setPostLoading());
    axios
      .get('/api/post')
      .then(res =>
        dispatch({
          type: GET_POSTS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_POSTS,
          payload: null
        })
      );
  };

  export const getPost = (id) => dispatch => {
    dispatch(setPostLoading());
    axios
      .get(`/api/post/${id}`)
      .then(res =>
        dispatch({
          type: GET_POST,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_POST,
          payload: null
        })
      );
  };


export const deletePost = id => dispatch => {
    axios
      .delete(`/api/post/${id}`)
      .then(res =>
        dispatch({
          type: DELETE_POST,
          payload: id
        })
      )
      .catch(err =>
        dispatch({
          type: THROW_ERR,
          payload: err.response.data
        })
      );
};

export const addLike = id => dispatch => {
    axios
      .post(`/api/post/like/${id}`)
      .then(res =>
        dispatch(getPosts())
      )
      .catch(err =>
        dispatch({
          type: THROW_ERR,
          payload: err.response.data
        })
      );
};

export const removeLike = id => dispatch => {
  axios
    .post(`/api/post/unlike/${id}`)
    .then(res =>
      dispatch(getPosts())
    )
    .catch(err =>
      dispatch({
        type: THROW_ERR,
        payload: err.response.data
      })
    );
};

export const setPostLoading = () => {
    return {
      type: LOADING_POST
    };
};