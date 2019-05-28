import React from 'react';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.user;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateField(type){
        return event => this.setState({[type]: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        this.loginUser(this.state)
    }

    render() {
        return (
            <div>
                <h2>Welcome to Greens</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Email or Username
                        <input type="text" value={this.state.username} onChange={this.updateField("username")}/>
                    </label>

                    <label>Password
                        <input type="password" value={this.state.password} onChange={this.updateField("password")}/>
                    </label>

                    <input type="submit" value="Sign In"/>
                </form>
            </div>
        )
    }
}

export default LoginForm;