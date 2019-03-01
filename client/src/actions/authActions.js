import {THROW_ERR, SET_CURR_USER} from './actions_const';
import setDefaultHeader from '../utils/setDefaultHeader';
import axios from 'axios';
import jwt_token from 'jwt-decode';


// Register User Action
export const registerAction = (userData, history) => dispatch => {

    axios.post('/api/user/signup', userData)
         .then(response => history.push('/login'))
         .catch(err => dispatch({
             type : THROW_ERR,
             payload : err.response.data
         }))
}

// Login token action
export const loginAction = userData => dispatch => {
    
    axios.post('/api/user/login/', userData)
         .then(res => {
             const {token} = res.data;
             localStorage.setItem('AUTH.TOKEN', token);

            //  Set default header to 'Authorization' after the user successfully logs in
            setDefaultHeader(token);

            const decoded = jwt_token(token);

            dispatch(setCurrentUser(decoded));

         })
         .catch(err => dispatch({
            type : THROW_ERR,
            payload : err.response.data
        }))

}

// Set current logged in user
export const setCurrentUser = (decoded) => {
    return {
        type : SET_CURR_USER,
        payload : decoded
    }
}

// Log out user
export const logOutAction = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('AUTH.TOKEN');

    // Unset the default auth header
    setDefaultHeader(false)

    // Clear user state
    dispatch(setCurrentUser({}))
}

