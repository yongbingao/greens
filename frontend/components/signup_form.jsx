import React from 'react';
import { signupUser, clearErrors } from '../actions/session_actions';
import { connect} from 'react-redux';

class SignupForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fname: "",
            lname: "",
            username: "", 
            email: "",
            password: "",
            blankFields: false,
            blankFieldName: null,
            validEmail: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleFocus(type) {
        return event => {
            // debugger
            this.setState({blankFieldName: null})
            if (this.state.blankFields){
                // debugger
                if (type == "password" && event.target.value.length < 10){
                    // debugger
                    this.setState({blankFieldName: type})
                } 
                else if(type == "email address"){
                    const re = /[^@]+@[^\.]+\..+/;
                    if (!re.test(event.target.value)){
                        this.setState({blankFieldName: type})
                    }
                } 
                else if(!event.target.value) {
                    this.setState({blankFieldName: type})
                }
            }
        }
    }

    handleBlur(event) {
        this.setState({blankFieldName: null});
    }

    updateField(type){
        return event => {
            // this.props.clearErrors();
            // debugger
            if (type == 'password') {
                if (event.target.value.length >= 10){
                    this.setState({blankFieldName: null});
                }
            } 
            else if(type =='email'){
                const re = /[^@]+@[^\.]+\..+/;
                if(re.test(event.target.value)){
                    this.setState({blankFieldName: null})
                }
            } 
            else {
                this.setState({blankFieldName: null});
            }
            this.setState({[type]: event.target.value});
        }
    }

    handleSubmit(event){
        event.preventDefault();
        const { fname, lname, email, username, password } = this.state;
        if (!fname || !lname || !email || !username || (password.length < 10)) {
            // debugger
            this.setState({blankFields: true});
        } else {
            // debugger
            this.props.signupUser(this.state);
        }
    }

    render() {
        const { fname, lname, username, email, password, validEmail } = this.state;
        const { blankFields, blankFieldName } = this.state;

        let errorList = null;
        let blankFnameInputField = null;
        let blankLnameInputField = null;
        let blankUsernameInputField = null;
        let blankEmailInputField = null;
        let invalidPasswordInputField = null;
        
        if (blankFields && blankFieldName){
            // debugger
            switch(blankFieldName){
                case "password":
                    if (password.length < 10) invalidPasswordInputField = <span className='password-tooltip'>Your password must be at least 10 <br/>characters.</span>;
                    break;
                case "first name":
                    blankFnameInputField = <span className="first-name-tooltip">Please enter your {blankFieldName}.</span>;
                    break;
                case "last name":
                    blankLnameInputField = <span className="last-name-tooltip">Please enter your {blankFieldName}.</span>;
                    break;
                case "username":
                    blankUsernameInputField = <span className="username-tooltip">Please enter your {blankFieldName}.</span>;
                    break;
                case "email address":
                    blankEmailInputField = <span className="email-tooltip">Please enter your email address.</span>;
                    break;
            }
        }

        // debugger
        this.props.errors.map( (el, idx) => {
            // debugger
            if (el.includes("Username")) {
                blankUsernameInputField = <span className="username-tooltip">A user with this username already exists.</span>;
            } else if (el.includes("Email")){
                blankEmailInputField = <span className="email-tooltip">A user with this email already exists.</span>;
            } else {
                errorList = <li key={idx}>{el}</li>
            }
        })
        // debugger
        if (blankFields && blankFieldName == 'email address' && email) {
            // debugger
            const re = /[^@]+@[^\.]+\..+/;
            if (!re.test(email)) {
                blankEmailInputField = <span className="email-tooltip">Please enter a valid email address.</span>
            } else {
                this.setState({validEmail: true})
            }
        }

        return (
            <div className='signup-form-container'>
                <form className="signup-form" onSubmit={this.handleSubmit}>
                    <h2>Make Your Money Move</h2>
                    <h3>Greens lets you invest in companies you love,<br/>commission-free.</h3>
                    <div className='name-input-fields'>
                        <input 
                            className={"sign-up-fname-input ".concat((blankFields && !fname) ? "blank-input-field" : "") } 
                            type="text" 
                            value={fname} 
                            onChange={this.updateField("fname")} 
                            placeholder="First name" 
                            onFocus={this.handleFocus('first name')}
                            onBlur={this.handleBlur} /> 
                        <input  
                            className={(blankFields && !lname) ? "blank-input-field" : null} 
                            type="text" 
                            value={lname} 
                            onChange={this.updateField("lname")} 
                            placeholder="Last name" 
                            onFocus={this.handleFocus('last name')}
                            onBlur={this.handleBlur} />
                        <br/>
                        {blankFnameInputField}
                        {blankLnameInputField}
                    </div>
                    <div className='username-email-password-input-fields'>
                        <input 
                            className={(blankFields && !username) ? "blank-input-field" : null} 
                            type="text" 
                            value={username} 
                            onChange={this.updateField("username")} 
                            placeholder="Username" 
                            onFocus={this.handleFocus('username')}
                            onBlur={this.handleBlur} />
                        <br/>
                        <input 
                            className={"email ".concat((blankFields && !(/[^@]+@[^\.]+\..+/.test(email))) ? "blank-input-field" : "")}  
                            type="text"     
                            value={email} 
                            onChange={this.updateField("email")} 
                            placeholder="Email address" 
                            onFocus={this.handleFocus('email address')}
                            onBlur={this.handleBlur} />
                        <br/>
                        <input 
                            className={(blankFields && password.length < 10) ? "blank-input-field" : null} 
                            type="password" 
                            value={password} 
                            onChange={this.updateField("password")} 
                            placeholder="Password (min. 10 characters)" 
                            onFocus={this.handleFocus('password')}
                            onBlur={this.handleBlur} />
                        <br/>
                        {blankEmailInputField}
                        {blankUsernameInputField}
                        {invalidPasswordInputField}
                        <br/>
                    </div>
                    <input id="signup-submit-button" type="submit" value="Sign Up" />
                    <br />
                    <ul>
                        {errorList}
                    </ul>
                </form>
                <section className='signup-form-right-section'>
                    <img src={window.signinImgURL} className='signup-page-img' />
                    <p className='signup-form-right-section-title'>Free Stock trading.</p>
                    <p className='signup-form-right-section-text'>Fast execution, updated market data, and 
                    data visualization help you make the most of the stock market no matter where you are.</p>
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
        signupUser: user => dispatch(signupUser(user)),
        clearErrors: () => dispatch(clearErrors())
    }
}

export default connect(msp, mdp)(SignupForm);