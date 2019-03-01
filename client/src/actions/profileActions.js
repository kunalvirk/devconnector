import axios from 'axios';
import { GET_PROFILE, CLEAR_PROFILE, LOADING_PROFILE, THROW_ERR, SET_CURR_USER, GET_PROFILES }  from './actions_const';

export const getProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile/')
         .then(response => 
                dispatch({
                    type :  GET_PROFILE,
                    payload : response.data
                })
          )
          .catch(err => 
            dispatch({
                type : GET_PROFILE,
                payload : {}
            })
          )
}

export const clearProfile = () => {
    return {
        type : CLEAR_PROFILE,
    }
}

export const deleteProfile = () => dispatch => {
    if (window.confirm("Are you sure you want to delete your account? This action can't be undone again!!!")) {
    axios.delete('/api/profile')
         .then(res => dispatch({
             type : SET_CURR_USER,
             payload : {}
         }))
         .catch(err => dispatch({
             type : THROW_ERR,
             payload : err.response.data
         }))
        }
}

export const createProfile = (userData, history) => dispatch => {
    axios.post('/api/profile', userData)
         .then(res => history.push('/dashboard'))
         .catch(err => dispatch({
             type : THROW_ERR,
             payload : err.response.data
         }))
}

export const addEducation = (user, history) => dispatch => {
    axios.post('/api/profile/education', user) 
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({
            type : THROW_ERR,
            payload : err.response.data
        }))
}

export const addExperience = (user, history) => dispatch => {
    axios.post('/api/profile/experience', user) 
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({
            type : THROW_ERR,
            payload : err.response.data
        }))
}

export const deleteExperience = (id) => dispatch => {
    axios.delete(`/api/profile/experience/${id}`) 
        .then(res => dispatch({
            type : GET_PROFILE,
            payload : res.data
        }))
        .catch(err => dispatch({
            type : THROW_ERR,
            payload : err.response.data
        }))
}

export const deleteEducation = (id) => dispatch => {
    axios.delete(`/api/profile/education/${id}`) 
        .then(res => dispatch({
            type : GET_PROFILE,
            payload : res.data
        }))
        .catch(err => dispatch({
            type : THROW_ERR,
            payload : err.response.data
        }))
}

export const getAllProfiles = () => dispatch => {
    axios.get('/api/profile/all')
         .then(res => dispatch({
             type : GET_PROFILES,
             payload : res.data
         }))
         .catch(err => dispatch({
            type: GET_PROFILES,
            payload: null
          }))
}

export const getProfileByHandle = (handle) => dispatch => {
    dispatch(setProfileLoading())
    axios.get(`/api/profile/handle/${handle}`)
         .then(res => dispatch({
             type : GET_PROFILE,
             payload : res.data
         }))
         .catch(err => dispatch({
            type: GET_PROFILE,
            payload: null
          }))
}

export const setProfileLoading = () => {
    return {
        type : LOADING_PROFILE,
    }
}