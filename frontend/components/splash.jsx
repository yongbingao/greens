import React from 'react';
import { Link } from 'react-router-dom';

const SplashPage = (props) => {
    return (
        <div className="splash-page-container">
            <nav className="splash-page-nav-bar">
                <section className='nav-bar-left-section'>
                    <Link className="logo-home-link" to='/'>Greens</Link> 
                    <a href='javascript:;'>Investing</a> 
                    <a href='javascript:;'>Cash Management</a>
                    <div className="splash-page-dropdown">
                        <button className='splash-page-dropdown-button'>More <i className='fas fa-angle-down'></i></button>
                        <div className="splash-page-dropdown-content">
                            <button>Snacks</button>
                            <button>Blog</button>
                            <button>Help</button>
                            <button>Careers</button>
                        </div>
                    </div>
                </section>
                <section className='nav-bar-right-section'>
                    <Link className="splash-page-login-button" to='/login'>Log In</Link>
                    <Link className="splash-page-signup-button" to='/signup'>Sign Up</Link>
                </section>
            </nav>

            <div className="splash-page-content">
                <section className='splash-page-content-left-section'>
                    <h1>Invest <br/>Commission-Free </h1>
                    <p>Invest in stocks, ETFs, options, and <br/>
                    cryptocurrencies, all commission-free, <br/>
                    right from your phone or desktop.</p>
                    <Link className="splash-page-signup-button" to='/signup'>Sign Up</Link>
                    <a href="javascript:;">Commissions Disclosure <i className='far fa-question-circle'></i></a>
                </section>
                <section className='splash-page-content-right-section'>
                
                </section>
            </div>

        </div>
    );
}

export default SplashPage;