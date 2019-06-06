import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { logoutUser } from '../actions/session_actions';

class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(event) {
        this.props.logoutUser();
    }  

    render() {
        const { username, current_buying_power } = this.props.user;
        return (
            <nav className="logged-in-page-nav-bar">
                <Link className="logged-in-page-logo" to='/dashboard'><i id="fa-feather" className="fas fa-feather"></i></Link>
                <div className="logged-in-page-search-box">
                    <i className="fas fa-search"></i>
                    <input className="logged-in-page-search-input-field" type="text" placeholder="Search" />
                </div>
                <div className="logged-in-page-nav-bar-right-section">
                    <button className="logged-in-page-nav-bar-button">
                        <Link to='/dashboard'>Home</Link>
                    </button>
                    <div className="logged-in-page-nav-bar-notifications">
                        <button className="logged-in-page-nav-bar-button">Notifications</button>
                        <ul className='nav-bar-notifications-content'>
                            <li>You currently have no notifications.</li>
                        </ul>
                    </div>
                    <div className="logged-in-page-nav-bar-account">
                        <button className="logged-in-page-nav-bar-button">Account</button>
                        <div className="nav-bar-account-content">
                            <span>{username}</span>
                            <span>${Number(current_buying_power).toLocaleString()}</span>
                            <span>Buying Power</span>
                            <span onClick={this.handleLogout}><i className="fas fa-sign-out-alt"></i>Log Out</span>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

const mdp = dispatch => {
    return {
        logoutUser: () => dispatch(logoutUser())
    }
}

export default connect(null, mdp)(NavBar);