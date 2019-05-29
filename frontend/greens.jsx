import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import { signupUser, loginUser, logout } from './util/session_api_util';

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById('root');

    const store = configureStore();
    // ReactDOM.render(<h1>Greens</h1>, root);
    ReactDOM.render(<Root store={store} />, root);
})

//TESTING ONLY
// window.signupUser = signupUser;
// window.loginUser = loginUser;
// window.logout = logout;