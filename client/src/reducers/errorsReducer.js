import {THROW_ERR} from '../actions/actions_const';

const initialState = {}

export default function (state = initialState, action) {
    switch(action.type) {
        case THROW_ERR : 
            return action.payload
        default :
        return state
    }
}
