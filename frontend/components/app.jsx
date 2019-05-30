import React from 'react';
import { Route } from 'react-router-dom';
import LoginForm from './login_form';
import SignupForm from './signup_form';
import SplashPage from './splash';
import DashboardPage from './dashboard';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { connect } from 'react-redux';

const App = ({state}) => {
    // debugger
    return (
        <>
            <ProtectedRoute path='/dashboard' component={DashboardPage} />
            <Route path='/' exact component={SplashPage} />
            <AuthRoute path='/login' component={LoginForm} />
            <AuthRoute path='/signup' component={SignupForm} />
        </>
    )
}

export default App;