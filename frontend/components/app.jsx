import React from 'react';
import { Route } from 'react-router-dom';
import LoginForm from './login_form';
import SignupForm from './signup_form'

const App = () => {
    return (
        <>
            <Route path='/login' component={LoginForm} />
            <Route path='/signup' component={SignupForm} />
        </>
    )
}

export default App;