import React from 'react';
import {fetchCompanyInfo} from '../../actions/company_actions';
import {fetchPrices, fetchNews} from '../../util/prices_api_util';
import {fetchWatchlist, createWatchlist, removeWatchlist} from "../../actions/watchlist_actions";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Chart from '../general_comp/chart';
import News from '../general_comp/news';
import NavBar from '../general_comp/nav_bar';
import TransactionForm from './transaction_form';

class DetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            priceData: {
                "1D": [],
                "1M": [],
                "3M": [],
                "1Y": [],
                "5Y": [],
            },
            news: [],
            timeframeFocus: "1D",
            intervalFunction: null};
        this.getNewPrice = this.getNewPrice.bind(this);
        this.handleWatchlistClick = this.handleWatchlistClick.bind(this);
        this.requestPrices = this.requestPrices.bind(this);
    }

    normalizeData(data){
        let latestClose = null;
        let latestOpen = null;

        return data.map(el => {
            if (el.close) {
                latestClose = el.close;
            }
            if(el.open){
                latestOpen = el.open;
            }
            return ({
                label: el.label,
                close: latestClose,
                open:latestOpen,
                }
            )
        })
    }

    requestPrices(ticker, timeframe){
        fetchPrices(ticker, timeframe)
            .then(respData => {
                const newData = Object.assign({}, this.state.priceData);
                newData[timeframe] = this.normalizeData(respData);
                this.setState({ priceData: newData, timeframeFocus: timeframe })
            },
            () => this.setState({timeframeFocus: timeframe}));
    }

    componentDidMount() {
        const id = this.props.match.params.companyId;
        this.props.fetchWatchlist(id);
        this.props.fetchCompanyInfo(id)
            .then((resp) => {
                const ticker = resp.company.ticker
                fetchPrices(ticker, "1D")
                    .then(oneDayData => {
                        if (oneDayData.length === 0){
                            this.requestPrices(ticker, "1M");
                        } else {
                            const newData = Object.assign({}, this.state.priceData);
                            newData["1D"] = this.normalizeData(oneDayData);
                            this.setState({ priceData: newData, timeframeFocus: "1D" })
                        }
                    });

                fetchNews(ticker)
                    .then(news => this.setState({news}));
                
                if (!this.state.intervalFunction) {
                    this.setState(
                        {intervalFunction: setInterval( () => {
                            this.requestPrices(ticker, "1D");
                            } 
                    ,60000)}
                    );
                }
            }
        )
    }

    componentWillUnmount() {
        if(this.state.intervalFunction) {
            clearInterval(this.state.intervalFunction);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const companyId = this.props.match.params.companyId;
        if (companyId !== prevProps.match.params.companyId){
            clearInterval(this.state.intervalFunction);
            this.setState({
                intervalFunction: null,
                priceData: {
                    "1D": [],
                    "1M": [],
                    "3M": [],
                    "1Y": [],
                    "5Y": [],
                }
            });
            this.props.fetchWatchlist(companyId);
            this.props.fetchCompanyInfo(companyId)
                .then((resp) => {
                    const ticker = resp.company.ticker;
                    fetchPrices(ticker, '1D')
                        .then(oneDayData => {
                            if (oneDayData.length === 0) {
                                this.requestPrices(ticker, "1M");
                            } else {
                                const newData = Object.assign({}, this.state.priceData);
                                newData["1D"] = this.normalizeData(oneDayData);
                                this.setState({ priceData: newData, timeframeFocus: "1D" })
                            }
                        });

                    fetchNews(ticker)
                        .then(news => this.setState({ news }))

                    if (!this.state.intervalFunction) {
                        this.setState({
                            intervalFunction: setInterval(() => {
                                    this.requestPrices(ticker, "1D");
                                }, 60000)
                            }
                        )
                    }
                })
        }
    }

    getNewPrice(timeframe) {
        return event => {
            const ticker = this.props.company.ticker;
            if (this.state.timeframeFocus !== timeframe && ticker){
                if (timeframe !== "1D") {
                    clearInterval(this.state.intervalFunction);
                    this.setState({intervalFunction: null});
                    if(this.state.priceData[timeframe].length){
                        this.setState({timeframeFocus: timeframe});
                    } else{
                        this.requestPrices(ticker, timeframe);
                    }
                } else {
                    this.requestPrices(ticker, timeframe);
                    this.setState({
                        intervalFunction: setInterval(() => {
                            this.requestPrices(ticker, "1D");
                        }
                        , 60000)
                    })
                }
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
        const { priceData, timeframeFocus } = this.state;
        const data = priceData[timeframeFocus];
        let latestPrice = null;
        let startPrice = null;
        let priceChange = null;
        let priceChangePercent = null;
        let graphColor = "green";
        if (data.length){
            let latestPos = data.length - 1;
            let beginPos = 0;
            while(latestPos > 0){
                if(data[latestPos].close !== null) break;
                latestPos--;
            }
            while(beginPos < data.length - 1){
                if(data[beginPos].open !== null) break;
                beginPos++;
            }
            latestPrice = Number((data[latestPos].close)).toFixed(2);
            startPrice = Number((data[beginPos].open).toFixed(2));
            priceChange = Number((latestPrice - startPrice)).toFixed(2);
            priceChangePercent = (priceChange / startPrice * 100).toFixed(2);
            graphColor = priceChange > 0 ? "green" : "red";
        }

        const timeframeButtons = Object.keys(priceData).map(el => {
            return (
                <button
                    key={`detail-page-timeframe-${el}`}
                    id={`${(graphColor).concat("-", timeframeFocus === el ? `logged-in-page-timeframe-${el}` : "")}`}
                    className={"logged-in-page-timeframe-button".concat("-", graphColor)}
                    onClick={this.getNewPrice(el)}>{el}
                </button>
            )
        })

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
                        <Chart data={data} graphColor={graphColor} startPrice={startPrice} range={"1D"}/>
                        <br/>
                        <section className="logged-in-page-timeframe-buttons">
                            {timeframeButtons}
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
                    <section className='details-page-content-right-section-container'>
                        <div className="details-page-transaction-form-container">
                            <TransactionForm ticker={ticker} companyId={id} price={Number(latestPrice)} />
                            <button onClick={this.handleWatchlistClick} className="details-page-watchlist-button" >
                                {Object.keys(currentWatchlist).length ? "Remove from Watchlist" : "Add to Watchlist"}
                            </button>
                        </div>
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