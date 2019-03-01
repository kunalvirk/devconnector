import {GET_PROFILE, LOADING_PROFILE, CLEAR_PROFILE, GET_PROFILES} from '../actions/actions_const';

const initialState = {
    profile : null,
    profiles : null,
    loading : false
}

export default function (state = initialState, action) {
    switch(action.type) {
        case LOADING_PROFILE : 
            return {
                ...state,
                loading : true
            }
        case GET_PROFILE : 
            return {
                ...state,
                profile : action.payload,
                loading : false
            }
        case GET_PROFILES : 
            return {
                ...state,
                profiles : action.payload,
                loading : false
            }            
        case CLEAR_PROFILE : 
            return {
                ...state,
                profile : null
            }
        default :
        return state    
    }
}
