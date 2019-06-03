import React from 'react';
import { fetchCompanyInfo } from '../actions/company_actions';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchPrices, fetchNews } from '../util/prices_api_util';
import Chart from './chart';
import News from './news';

class DetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            news: []};
        this.getNewPrice = this.getNewPrice.bind(this);
    }

    componentDidMount() {
        // debugger
        const id = this.props.match.params.companyId;
        this.props.fetchCompanyInfo(id)
            .then((resp) => {
                // debugger
                fetchPrices(resp.company.ticker, "1D").then(data => this.setState({ data }))
                fetchNews(resp.company.ticker).then(news => this.setState({news}))
            })
    }

    getNewPrice(timeframe) {
        
        return event => {
            if (this.props.company.ticker){
                // debugger
                fetchPrices(this.props.company.ticker, timeframe)
                    .then(data => this.setState({data}))
            }
        }
    }

    render() {
        // console.log(this.state.data);
        // debugger
        if (!this.props.company) {
            return (
                <React.Fragment>
                    <h1>Details Page</h1>
                    <br/>
                    <h1>Retreiving Data</h1>
                </React.Fragment>
            )
        }
        // debugger
        const { name, ticker, about, ceo, employees, headquarter, founded, market_cap, pe_ratio, dividend, avg_volume} = this.props.company;

        return (
            <div className="details-page-container">
                <nav className="details-page-nav-bar">
                    <i id="fa-feather" className="fas fa-feather"></i>
                    <div className="details-page-search-box">
                        <i className="fas fa-search"></i>
                        <input className="details-page-search-input-field" type="text" placeholder="Search"/>
                    </div>
                    <div className="details-page-nav-bar-right-section">
                        <button className="details-page-nav-bar-button">
                            <Link to='/dashboard'>Home</Link>
                        </button>
                        <button className="details-page-nav-bar-button">Notifications</button>
                        <button className="details-page-nav-bar-button">Account</button>
                    </div>
                </nav>
                <br/>
                <section className="details-page-content-container">
                    <section className='details-page-content-left-section'>

                        <h1>{name}</h1>
                        <Chart data={this.state.data} />
                        <br/>
                        <section className="details-page-timeframe-buttons">
                            <button className="details-page-timeframe-button" onClick={this.getNewPrice("1D")}>1D</button>
                            <button className="details-page-timeframe-button" onClick={this.getNewPrice("1M")}>1M</button>
                            <button className="details-page-timeframe-button" onClick={this.getNewPrice("3M")}>3M</button>
                            <button className="details-page-timeframe-button" onClick={this.getNewPrice("1Y")}>1Y</button>
                            <button className="details-page-timeframe-button" onClick={this.getNewPrice("5Y")}>5Y</button>
                        </section>
                        <br/>
                        <h3>About</h3>
                        <p>{about}</p>
                        <br/>
                        <ul className="details-page-content-left-section-first-list">
                            <li>CEO  <br/><span>{ceo}</span></li>
                            <li>Employees <br /><span>{employees}</span></li>
                            <li>Headquarters <br/><span>{headquarter}</span></li>
                            <li>Founded <br/><span>{founded}</span></li>
                        </ul>
                        <ul className="details-page-content-left-section-second-list">
                            <li>Market Cap <br/><span>{market_cap}B</span></li>
                            <li>Price-Earning Ratio <br /><span>{pe_ratio || "-"}</span></li>
                            <li>Dividend Yield <br /><span>{dividend || "-"}</span></li>
                            <li>Average Volume <br /><span>{(avg_volume / 1000000).toFixed(2)}M</span></li>
                        </ul>
                        <br/>
                        <h3>News</h3>
                        <News news={this.state.news}/>
                    </section>
                    <section className='details-page-content-right-section'></section>
                </section>
            </div>
        )
    }
}

const msp = (state, ownProps) => {
    const id = ownProps.match.params.companyId;
    return {
        company: state.entities.companies[id]
    }
}

const mdp = dispatch => {
    return {
        fetchCompanyInfo: id => dispatch(fetchCompanyInfo(id))
    }
}

export default withRouter(connect(msp, mdp)(DetailsPage));