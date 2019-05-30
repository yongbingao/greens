import React from 'react';
import { logoutUser } from '../actions/session_actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class DashboardPage extends React.Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(event) {
        // debugger
        this.props.logoutUser();
    }    

    render() {
        return (
            <div>
                <h1>Dashboard Page</h1>
                <button onClick={this.handleLogout}>Log Out</button>
            </div>
        )
    }
}

const mdp = dispatch => {
    return {
        logoutUser: () => dispatch(logoutUser()),
    }
}

export default withRouter(connect(null, mdp)(DashboardPage));