import * as APISessionUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';

const receiveCurrentUser = user => {
    return {
        type: RECEIVE_CURRENT_USER,
        user
    }
}

const receiveErrors = errors => {
    return {
        type: RECEIVE_ERRORS,
        errors
    }
}

const logoutCurrentUser = () => {
    return {
        type: LOGOUT_CURRENT_USER
    }
}

export const loginUser = user => dispatch => {
    return APISessionUtil.loginUser(user).then( user => dispatch(receiveCurrentUser(user)))
}

export const signupUser = user => dispatch => {
    return APISessionUtil.signupUser(user).then( user => dispatch(receiveCurrentUser(user)))
}

export const logoutUser = () => dispatch => {
    return APISessionUtil.logout().then( () => dispatch(logoutCurrentUser()))
}