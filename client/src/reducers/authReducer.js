import {SET_CURR_USER} from '../actions/actions_const';
import isEmpty from '../validations/isEmpty';

const initialState = {
    isAuthorised : false,
    user : {}
}

export default function (state = initialState, action) {
    switch(action.type) {
        case SET_CURR_USER : 
            return {
                ...state,
                isAuthorised : !isEmpty(action.payload),
                user : action.payload
            }
        default :
        return state
    }
}
