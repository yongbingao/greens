import React from 'react';
import { withRouter } from 'react-router-dom';
import { loginUser, receiveErrors } from '../actions/session_actions';
import { connect } from 'react-redux';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username:"", password:""};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDemo = this.handleDemo.bind(this);
    }

    updateField(type){
        return event => this.setState({[type]: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        const { username, password } = this.state;
        if (username === "" || password === ""){
            this.props.receiveErrors(["Please fill out this field."]);
        } else {
            this.props.loginUser(this.state)
        }
    }

    handleDemo(event) {
        this.props.demoLogin({username:"Demo", password:"longpassword"}) 
    }

    render() {
        const errorList = this.props.errors.map( (el, idx) => {
            return (
            <li key={idx}>
                <i className='fas fa-exclamation-circle'></i>
                {el}
            </li>)
        })
        return (
            <div className="login-page-container">
                <section className='left-side-img'> 
                    <img src={window.loginImgURL} className='login-page-img' /> 
                </section>
                <section className='right-side-container'>
                    <h2>Welcome to Greens</h2>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="login-email">Email or Username</label>
                        <br/>
                        <input required id='login-email' type="text" value={this.state.username} onChange={this.updateField("username")}/>
                        <br/>
                        <label htmlFor="login-password">Password</label>
                        <br/>
                        <input required id="login-password" type="password" value={this.state.password} onChange={this.updateField("password")}/>
                        <br/>
                        <a href='javascript:;'>Forgot your username/password?</a>
                        <br/>
                        <ul>
                            {errorList}
                        </ul>
                        <br/>
                        <input id='login-submit-button' type="submit" value="Sign In"/>
                        <button className='login-page-demo-button' onClick={this.handleDemo}>Demo</button>
                        <br/>
                    </form>
                </section> 
            </div>
        )
    }
}

const msp = state => {
    return {
        errors: state.errors.session
    }
}

const mdp = dispatch => {
    return {
        loginUser: user => dispatch(loginUser(user)),
        receiveErrors: errors => dispatch(receiveErrors(errors)),
        demoLogin: user => dispatch(loginUser(user))
    }
}

export default connect(msp, mdp)(LoginForm);