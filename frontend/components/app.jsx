import React from 'react';
import { Route } from 'react-router-dom';
import LoginForm from './session/login_form';
import SignupForm from './session/signup_form';
import SplashPage from './session/splash';
import DashboardPage from './dashboard/dashboard';
import DetailsPage from './stock_detail/details';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => {
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