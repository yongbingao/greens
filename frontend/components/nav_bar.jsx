import React from 'react';
import { Link } from "react-router-dom";

const NavBar = props => {
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
                <button className="logged-in-page-nav-bar-button">Notifications</button>
                <button className="logged-in-page-nav-bar-button">Account</button>
            </div>
        </nav>
    )
}

export default NavBar;