import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { logoutUser } from '../../actions/session_actions';
import { receiveClearTransaction } from '../../actions/transaction_actions'
import { fetchCompaniesInfo } from '../../actions/company_actions';

class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            searchInput: "",
            matchingCompanyNames: [],
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.updateField = this.updateField.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
    }
    
    componentDidMount() {
        if (this.props.fetchCompanies) this.props.fetchCompaniesInfo();
    }
    
    handleLogout(event) {
        this.props.logoutUser();
    }  

    updateField(event) {
        const val = event.target.value;
        this.setState({searchInput: val});
        const matchingCompanyList = [];
        if (!val){
            this.setState({matchingCompanyNames: []})
        } else if(this.props.companies.length){
            this.props.companies.forEach( el => {
                if (el.name.toLowerCase().startsWith(val.toLowerCase()) || el.ticker.toLowerCase().startsWith(val.toLowerCase())){
                    matchingCompanyList.push(el);
                }
            })
            this.setState({matchingCompanyNames: matchingCompanyList})
        }
    }

    handleSearchClick(event) {
        this.setState({searchInput: "", matchingCompanyNames: []});
    }

    render() {
        const { username, current_buying_power } = this.props.user;

        let searchResults = this.state.matchingCompanyNames.map( el => {
            return (
                <Link key={"search-result-".concat(el.ticker)} to={`/stock/${el.id}`} onClick={this.handleSearchClick}>
                    <span>{el.ticker}</span>
                    <span>{el.name}</span>
                </Link>
            )
        })

        if (searchResults.length) searchResults.unshift( <h5 key="nav-bar-search-box-result-title">Stocks</h5> )

        if (this.state.searchInput && !this.state.matchingCompanyNames.length){
            searchResults = [<span key="nav-bar-search-box-no-result-mesg">Unable to find any results for your search.</span>]
        }

        return (
            <nav className="logged-in-page-nav-bar">
                <Link className="logged-in-page-logo" to='/dashboard'><i id="fa-feather" className="fas fa-feather"></i></Link>

                <div className="logged-in-page-search-box-container" id={searchResults.length ? "search-box-with-results" : ""}>
                    <div className="logged-in-page-search-box">
                        <i className="fas fa-search"></i>
                        <input 
                            onChange = {this.updateField}
                            className="logged-in-page-search-input-field" 
                            type="text" 
                            value={this.state.searchInput} 
                            placeholder="Search" />
                        <br/>
                    </div>
                    <div className="nav-bar-search-results">

                        {searchResults}
                    </div>
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

const msp = (state, ownProps) => {
    return {
        companies: Object.values(state.entities.companies)
    }
}

const mdp = dispatch => {
    return {
        logoutUser: () => dispatch(logoutUser()),
        fetchCompaniesInfo: () => dispatch(fetchCompaniesInfo()),
        clearTransactions: () => dispatch(receiveClearTransaction())
    }
}

export default connect(msp, mdp)(NavBar);