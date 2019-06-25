import React from 'react';
import {fetchCompanyInfo} from '../actions/company_actions';
import {fetchPrices, fetchNews} from '../util/prices_api_util';
import {fetchAllWatchlists, fetchWatchlist, createWatchlist, removeWatchlist} from "../actions/watchlist_actions";
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import Chart from './chart';
import News from './news';
import NavBar from './nav_bar';
import TransactionForm from './transaction_form';

class DetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            news: [],
            timeframeFocus: null,
            intervalFunction: null};
        this.getNewPrice = this.getNewPrice.bind(this);
        this.handleWatchlistClick = this.handleWatchlistClick.bind(this);
    }

    componentDidMount() {
        // debugger
        const id = this.props.match.params.companyId;
        this.props.fetchWatchlist(id);
        this.props.fetchCompanyInfo(id)
            .then((resp) => {
                // debugger
                const ticker = resp.company.ticker
                fetchPrices(ticker, "1D")
                    .then(data => {
                        // debugger
                        if (!data.length){
                            fetchPrices(ticker, "1M").then(data => this.setState({ data, timeframeFocus: "1M" }));
                            clearInterval(this.state.intervalFunction);
                            this.setState({intervalFunction: null})
                        } else {
                            this.setState({ data, timeframeFocus: "1D" })}
                        });
                fetchNews(ticker)
                    .then(news => this.setState({news}));
                
                if (!this.state.intervalFunction) {
                    this.setState(
                        {intervalFunction: setInterval( () => {
                            // console.log("in componentDidMount interval"); 
                            fetchPrices(ticker, "1D")
                                .then(data => this.setState({ data }))
                            } 
                    ,60000)}
                    );
                    // debugger
                }
            }
        )
    }

    componentWillUnmount() {
        // debugger
        if(this.state.intervalFunction) {
            clearInterval(this.state.intervalFunction);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const companyId = this.props.match.params.companyId;
        // debugger
        if (companyId !== prevProps.match.params.companyId){
            // debugger
            clearInterval(this.state.intervalFunction);
            this.setState({intervalFunction: null});
            // this.props.history.push(`/stock/${companyId}`)
            this.props.fetchWatchlist(companyId);
            this.props.fetchCompanyInfo(companyId)
                .then((resp) => {
                    const ticker = resp.company.ticker;
                    fetchPrices(ticker, '1D')
                        .then(data => {
                            if (!data.length) {
                                fetchPrices(ticker, "1M").then(data => this.setState({ data, timeframeFocus: "1M" }));
                                clearInterval(this.state.intervalFunction);
                                this.setState({ intervalFunction: null });
                            } else {
                                this.setState({ data, timeframeFocus: "1D" })
                            }
                        });
                    fetchNews(ticker)
                        .then(news => this.setState({ news }))

                    if (!this.state.intervalFunction) {
                        this.setState(
                            {
                                intervalFunction: setInterval(() => {
                                    // console.log("in componentDidUpdate interval");
                                    fetchPrices(ticker, "1D")
                                        .then(data => this.setState({ data }))
                                }
                                    , 60000)
                            }
                        );
                        // debugger
                    }
                })
        }
    }

    getNewPrice(timeframe) {
        // this.setState({timeframeFocus: null});
        return event => {
            if (this.props.company.ticker){
                // debugger
                if (timeframe != "1D") {
                    clearInterval(this.state.intervalFunction);
                    this.setState({intervalFunction: null})
                } else {
                    this.setState({
                        intervalFunction: setInterval(() => {
                            // console.log("in getNewPrice interval");
                            fetchPrices(this.props.company.ticker, "1D")
                                .then(data => this.setState({ data }))
                        }
                        , 60000)
                    })
                }
                fetchPrices(this.props.company.ticker, timeframe)
                    .then(data => this.setState({data, timeframeFocus: timeframe}))
            }
        }
    }

    handleWatchlistClick(event) {
        const id = this.props.company.id;
        if(event.target.innerHTML === "Add to Watchlist"){
            this.props.createWatchlist({company_id: id});
        } else {
            this.props.removeWatchlist(this.props.currentWatchlist.id);
        }
    }

    render() {
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
        
        const { company: 
            {id, name, ticker, about, ceo, employees, headquarter, founded, market_cap, pe_ratio, dividend, avg_volume},
            currentWatchlist } = this.props;
        const { data } = this.state;
        let latestPrice = null;
        let startPrice = null;
        let priceChange = null;
        let priceChangePercent = null;
        let graphColor = "green";
        if (data && data.length){
            let pos = data.length - 1;
            while (!data[pos].close) {
                pos--;
            }
            // debugger
            latestPrice = Number((data[pos].close)).toFixed(2);
            startPrice = Number((data[0].open || data[0].marketOpen)).toFixed(2);
            priceChange = Number((latestPrice - startPrice)).toFixed(2);
            priceChangePercent = (priceChange / startPrice * 100).toFixed(2);
            graphColor = priceChange > 0 ? "green" : "red";
            // debugger
        }
        // debugger
        return (
            <div className="logged-in-page-container">
                <NavBar user={this.props.user} fetchCompanies={true} />
                <section className="logged-in-page-content-container">
                    <section className='logged-in-page-content-left-section'>
                        <h1>{name}</h1>
                        <h2>{latestPrice ? "$".concat(Number(latestPrice).toLocaleString()) : latestPrice}</h2>
                        <h4>{
                            priceChange ? 
                            (priceChange > 0 ? "+".concat("$", priceChange.toLocaleString(), ` (${priceChangePercent}%)`) : "-".concat("$", priceChange*-1, ` (${priceChangePercent}%)`)) 
                            : priceChange} </h4>
                        <Chart data={this.state.data} graphColor={graphColor} startPrice={startPrice} range={"1D"}/>
                        <br/>
                        <section className="logged-in-page-timeframe-buttons">
                            <button 
                                id={`${(graphColor).concat("-", this.state.timeframeFocus == "1D" ? "logged-in-page-timeframe-1D" : "")}`} 
                                className={"logged-in-page-timeframe-button".concat("-", graphColor)} 
                                onClick={this.getNewPrice("1D")}>1D
                            </button>
                            <button 
                                id={`${(graphColor).concat("-", this.state.timeframeFocus == "1M" ? "logged-in-page-timeframe-1M" : "")}`} 
                                className={"logged-in-page-timeframe-button".concat("-", graphColor)} 
                                onClick={this.getNewPrice("1M")}>1M
                            </button>
                            <button 
                                id={`${(graphColor).concat("-", this.state.timeframeFocus == "3M" ? "logged-in-page-timeframe-3M" : "")}`} 
                                className={"logged-in-page-timeframe-button".concat("-", graphColor)} 
                                onClick={this.getNewPrice("3M")}>3M
                            </button>
                            <button 
                                id={`${(graphColor).concat("-", this.state.timeframeFocus == "1Y" ? "logged-in-page-timeframe-1Y" : "")}`} 
                                className={"logged-in-page-timeframe-button".concat("-", graphColor)} 
                                onClick={this.getNewPrice("1Y")}>1Y
                            </button>
                            <button 
                                id={`${(graphColor).concat("-", this.state.timeframeFocus == "5Y" ? "logged-in-page-timeframe-5Y" : "")}`} 
                                className={"logged-in-page-timeframe-button".concat("-", graphColor)} 
                                onClick={this.getNewPrice("5Y")}>5Y
                            </button>
                        </section>
                        <br/>
                        <h3>About</h3>
                        <p>{about}</p>
                        <br/>
                        <ul className="logged-in-page-content-left-section-first-list">
                            <li>CEO  <br/><span>{ceo}</span></li>
                            <li>Employees <br /><span>{Number(employees).toLocaleString()}</span></li>
                            <li>Headquarters <br/><span>{headquarter}</span></li>
                            <li>Founded <br/><span>{founded}</span></li>
                        </ul>
                        <ul className="logged-in-page-content-left-section-second-list">
                            <li>Market Cap <br/><span>{market_cap}B</span></li>
                            <li>Price-Earning Ratio <br /><span>{pe_ratio || "-"}</span></li>
                            <li>Dividend Yield <br /><span>{dividend || "-"}</span></li>
                            <li>Average Volume <br /><span>{(avg_volume / 1000000).toFixed(2)}M</span></li>
                        </ul>
                        <br/>
                        <h3>News</h3>
                        <News news={this.state.news}/>
                    </section>
                    <section className='details-page-transaction-form-container'>
                        <TransactionForm ticker={ticker} companyId={id} price={Number(latestPrice)} />
                        <button onClick={this.handleWatchlistClick} className="details-page-watchlist-button" >
                            {Object.keys(currentWatchlist).length ? "Remove from Watchlist" : "Add to Watchlist"}
                        </button>
                    </section>
                </section>
            </div>
        )
    }
}

const msp = (state, ownProps) => {
    const id = ownProps.match.params.companyId;
    const {companies, user, watchlists: {currentWatchlist}} = state.entities;
    return {
        company: companies[id],
        user: user[state.session.currentUserId],
        currentWatchlist,
    }
}

const mdp = dispatch => {
    return {
        fetchCompanyInfo: id => dispatch(fetchCompanyInfo(id)),
        fetchWatchlist: id => dispatch(fetchWatchlist(id)),
        createWatchlist: watchlist => dispatch(createWatchlist(watchlist)),
        removeWatchlist: id => dispatch(removeWatchlist(id)),
    }
}

export default withRouter(connect(msp, mdp)(DetailsPage));