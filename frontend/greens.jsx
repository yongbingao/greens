import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import { signupUser, loginUser, logout } from './util/session_api_util';

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById('root');
    let preloadedState = undefined;

    if (window.currentUser) {
        preloadedState= {
            entities: {user: window.currentUser},
            session: {currentUserId: window.currentUser.id}}
    }
    
    const store = configureStore(preloadedState);

    //TESTING ONLY
    window.store = store;

    ReactDOM.render(<Root store={store} />, root);
})

//TESTING ONLY
// window.signupUser = signupUser;
// window.loginUser = loginUser;
// window.logout = logout;