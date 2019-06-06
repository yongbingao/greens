import React from 'react';
import { Route } from 'react-router-dom';
import LoginForm from './login_form';
import SignupForm from './signup_form';
import SplashPage from './splash';
import DashboardPage from './dashboard';
import DetailsPage from './details';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => {
    // debugger
    return (
        <>
            <ProtectedRoute path='/stock/:companyId' component={DetailsPage} />
            <ProtectedRoute path='/dashboard' component={DashboardPage} />
            <Route path='/' exact component={SplashPage} />
            <AuthRoute path='/login' component={LoginForm} />
            <AuthRoute path='/signup' component={SignupForm} />
        </>
    )
}

export default App;