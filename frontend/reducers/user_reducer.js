import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { merge } from 'lodash';

const userReducer = (state={}, action) => {
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_CURRENT_USER:
            merge( {}, state, action.user)
        default: return state;
    }
}

export default userReducer;