import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const msp = state => {
    return {loggedIn: Boolean(state.session.currentUserId)};
}

const Auth = ({ component: Component, exact, path, loggedIn}) => {
    return (
    <Route 
        path={path} 
        exact={exact} 
        render= {props => (
            loggedIn ? <Redirect to='/dashboard' /> : <Component {...props} />
        )}
    />
    )
}

const Protected = ({ component: Component, exact, path, loggedIn}) => {
    return (
        <Route
            path={path}
            exact={exact}
            render= {props => (
                loggedIn ? <Component {...props} /> : <Redirect to='/login' />
            )}
        />
    )
}

export const AuthRoute = withRouter(connect(msp)(Auth));
export const ProtectedRoute = withRouter(connect(msp)(Protected));
