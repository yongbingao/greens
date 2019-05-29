import React from 'react';
import { signupUser } from '../actions/session_actions';
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
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFocus(type) {
        return event => {
            // debugger
            this.setState({blankFieldName: null})
            if (this.state.blankFields){
                // debugger
                if (type == "password" && event.target.value.length < 10){
                    // debugger
                    this.setState({blankFieldName: [type]})
                } else if(!event.target.value) {
                    this.setState({blankFieldName: [type]})
                }
            }
        }
    }

    updateField(type){
        return event => {
            if (type == 'password') {
                if (event.target.value.length >= 10){
                    this.setState({blankFieldName: null});
                }
            } else {
                this.setState({blankFieldName: null});
            }
            this.setState({[type]: event.target.value});
        }
    }

    handleSubmit(event){
        event.preventDefault();
        const { fname, lname, email, username, password } = this.state;
        if (!fname || !lname || !email || !username || !password) {
            // debugger
            this.setState({blankFields: true});
        } else {
            // debugger
            this.props.signupUser(this.state);
        }
    }

    render() {
        const { fname, lname, username, email, password } = this.state;
        const { blankFields, blankFieldName } = this.state;
        const errorList = this.props.errors.map( (el, idx) => {
            return <li key={idx}>{el}</li>
        })
        let blankInputField = null;
        // debugger
        if (blankFields && blankFieldName){
            // debugger
            if (blankFieldName == "password" && password.length < 10){
                // debugger
                blankInputField = <p>Your password must be at least 10 characters.</p>
            } else {
                blankInputField = <p>Please enter your {blankFieldName}.</p>
            }
        }

        return (
            <>
                <h2>Sign Up</h2>
                <form className="signup-form" onSubmit={this.handleSubmit}>
                    <input 
                        className={(blankFields && !fname) ? "blank-input-field" : null } 
                        type="text" 
                        value={fname} 
                        onChange={this.updateField("fname")} 
                        placeholder="First name" 
                        onFocus={this.handleFocus('first name')}/> 
                    <input  
                        className={(blankFields && !lname) ? "blank-input-field" : null} 
                        type="text" 
                        value={lname} 
                        onChange={this.updateField("lname")} 
                        placeholder="Last name" 
                        onFocus={this.handleFocus('last name')}/>
                    <br/>
                    <input 
                        className={(blankFields && !username) ? "blank-input-field" : null} 
                        type="text" 
                        value={username} 
                        onChange={this.updateField("username")} 
                        placeholder="Username" 
                        onFocus={this.handleFocus('username')}/>
                    <br/>
                    <input 
                        className={(blankFields && !email) ? "blank-input-field" : null}  
                        type="text"     
                        value={email} 
                        onChange={this.updateField("email")} 
                        placeholder="Email address" 
                        onFocus={this.handleFocus('email address')}/>
                    <br/>
                    <input 
                        className={(blankFields && password.length < 10) ? "blank-input-field" : null} 
                        type="password" 
                        value={password} 
                        onChange={this.updateField("password")} 
                        placeholder="Password (min. 10 characters)" 
                        onFocus={this.handleFocus('password')}/>
                    <br/>
                    {blankInputField}
                    <br/>
                    <input type="submit" value="Sign Up" />
                    <br />
                    <ul>
                        {errorList}
                    </ul>
                </form>
            </>
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
        signupUser: user => dispatch(signupUser(user))
    }
}

export default connect(msp, mdp)(SignupForm);