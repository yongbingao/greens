import {fetchQuotes, fetchBatchNews, fetchBatchDayPrices} from '../util/prices_api_util';
import {logoutUser} from '../actions/session_actions';
import {fetchTransactions} from '../actions/transaction_actions';
import {fetchCompaniesInfo} from '../actions/company_actions';
import {fetchAllWatchlists} from "../actions/watchlist_actions";
import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import PortfolioSummary from "./portfolio_summary";
import NavBar from './nav_bar';
import Chart from './chart';
import News from './news';

class DashboardPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: {},
            chartData: [],
            news: [],
            intervalFunction: null,
            quotes: {},
            numberOfCompanies: 0,
            portfolioHistroy: [],  
            openPositionCompanyId: [],
            numberOfOpenPositions: 0,  
        };
        this.createChartData = this.createChartData.bind(this);
    } 
    
    componentDidMount() {
        // debugger
        this.props.fetchCompaniesInfo();
        this.props.fetchAllWatchlists();
        this.props.fetchTransactions()
            .then(resp => {
                const allTransactions = Object.values(resp.transactions.allTransactions);
                const openPositionList = {};
                const portfolioHistroy = [];

                const portfolioInMin = [];
                const currentDate = new Date((new Date).toLocaleDateString()); // sets current date to be at midnight of current date
                const startTimeEpoch = currentDate.getTime() + 9.5*60*60*1000; // startTime is 9:00am of current date
                let i = 0;
                let minCounter = 0;

                debugger
                while (portfolioHistroy.length < 390){
                    const currentTimeEpoch = startTimeEpoch + minCounter*60*1000;
                    
                    if(i >= allTransactions.length){
                        // const splitCurrentTime = ((new Date(currentTimeEpoch)).toLocaleTimeString()).split(" ");

                        // if (splitCurrentTime[0].length === 7) {
                        //     splitCurrentTime[0] = "0".concat(splitCurrentTime[0]);
                        // }
                        // const formattedCurrentTime = splitCurrentTime[0].slice(0, 5).concat(" ", splitCurrentTime[1]);

                        let hour = (new Date(currentTimeEpoch)).getHours().toString();
                        let minute = (new Date(currentTimeEpoch)).getMinutes().toString();

                        if(hour.length < 2){
                            hour = "0".concat(hour);
                        }
                        if(minute.length < 2){
                            minute = "0".concat(minute);
                        }

                        const formattedCurrentTime = hour.concat(":", minute);

                        portfolioHistroy.push({
                            label: formattedCurrentTime,
                            positions: Object.assign({}, openPositionList)
                        });
                        minCounter++;
                        continue;
                    }
                    const {company_id, created_at} = allTransactions[i];
                    const createdAtEpoch = (new Date(created_at)).getTime();

                    if(createdAtEpoch < currentTimeEpoch){
                        openPositionList[company_id] = allTransactions[i];
                        i++;
                    } else if(createdAtEpoch === currentTimeEpoch){
                        openPositionList[company_id] = allTransactions[i];
                        i++;
                    } else {
                        // const splitCurrentTime = ((new Date(currentTimeEpoch)).toLocaleTimeString()).split(" ");

                        // if(splitCurrentTime[0].length === 7){
                        //     splitCurrentTime[0] = "0".concat(splitCurrentTime[0]);
                        // }
                        
                        // const formattedCurrentTime = splitCurrentTime[0].slice(0, 5).concat(" ", splitCurrentTime[1]);
                        let hour = (new Date(currentTimeEpoch)).getHours().toString();
                        let minute = (new Date(currentTimeEpoch)).getMinutes().toString();

                        if (hour.length < 2) {
                            hour = "0".concat(hour);
                        }
                        if (minute.length < 2) {
                            minute = "0".concat(minute);
                        }

                        const formattedCurrentTime = hour.concat(":", minute);

                        portfolioHistroy.push({
                            label: formattedCurrentTime,
                            positions: Object.assign({}, openPositionList)
                        });
                        minCounter++;
                    }
                }
                // debugger
                this.setState({portfolioHistroy})
                this.setState({openPositionCompanyId: Object.keys(openPositionList)})
                // // iterate over all transactions, check if transaction's company id is in openPositionList,
                // // a list to keep track of open positions of users
                // allTransactions.forEach((transaction, idx) => {
                //     const { company_id, created_at, net_shares, average_price } = transaction;

                //     // check if there is an open position for current transaction's company
                //     if (openPositionList[company_id] === undefined) {
                //         openPositionList[company_id] = transaction;

                //         // if there is no open position for current transactin's company and 
                //         // there is no recorded transaction in portfolioHistroy yet, push the first object with date and total portfolio value
                //         if (portfolioHistroy.length === 0) {
                //             const total = net_shares * average_price;
                //             portfolioHistroy.push({ label: idx, close: total })
                //             // new Date(created_at).toLocaleDateString
                //         } else { // if there are already recorded transactions then add onto the last total portfolio value
                //             const prevTotal = portfolioHistroy[portfolioHistroy.length - 1].close;
                //             const total = prevTotal + net_shares * average_price;
                //             portfolioHistroy.push({ label: idx, close: total })
                //         }
                //     } else { // if there is an open position for current transaction's company
                //         const prevNetShares = openPositionList[company_id].net_shares;
                //         const prevAveragePrice = openPositionList[company_id].average_price;
                //         const prevTotal = portfolioHistroy[portfolioHistroy.length - 1].close;
                //         const total = prevTotal - (prevNetShares * prevAveragePrice) + (net_shares * average_price);

                //         openPositionList[company_id] = transaction;
                //         portfolioHistroy.push({ label: idx, close: total });
                //     }
                // })
                // this.setState({portfolioHistroy});
            });
    }

    componentWillUnmount() {
        if (this.state.intervalFunction) {
            clearInterval(this.state.intervalFunction);
        }
    }

    componentDidUpdate() {
        // debugger
        const companiesLength = Object.keys(this.props.companies).length;

        // checks to see if the list of companies changed based on new information from transactions or wathchlists
        if(this.state.numberOfCompanies !== companiesLength){
            // debugger
            this.setState({numberOfCompanies: companiesLength});
            
            if(this.state.intervalFunction) clearInterval(this.state.intervalFunction);
            
            const tickers = Object.values(this.props.companies).map( el => el.ticker);
            fetchQuotes(tickers)
                .then( quotes => this.setState({quotes}));
            fetchBatchNews(tickers).then( resp => {
                const newsObj = Object.values(resp);
                let news = [];
                newsObj.forEach( el => news = news.concat(el.news));
                this.setState({news});
            });
    
            this.setState({
                intervalFunction: setInterval(() => {
                    fetchQuotes(tickers).then( quotes => this.setState({quotes}))
                }, 60000)
            });
        }

        // fetches data for dashboard chart
        if(this.state.numberOfOpenPositions !== this.state.openPositionCompanyId.length && companiesLength){
            // fetch price from IEX
            let tickerList = Object.values(this.props.companies).map(el => el.ticker);
            this.setState({numberOfOpenPositions: this.state.openPositionCompanyId.length});
            debugger
            tickerList = tickerList.filter(ticker => ticker !== "ADDYY"); //remove ADDYY, price data for ADDYY requires requires an upgraded account to access 
            fetchBatchDayPrices(tickerList)
                .then(resp => {
                    this.setState({data: resp})
                })
        }

    }

    getNewPrice() {}

    createChartData(){
        const chartData = [];
        const {data} = this.state;
        const latestPrices = {};

        this.state.portfolioHistroy.forEach((histroyItem, index) => {
            const openPos = Object.values(histroyItem.positions);
            let portfolioValue = 0;
            openPos.forEach((position, priceIdx) => {
                const ticker = this.props.companies[position.company_id].ticker;
                const net_shares = position.net_shares;
                let currentPrice;

                if (data[ticker].chart[index] !== undefined) {
                    currentPrice = data[ticker].chart[index].marketClose;
                    if(currentPrice !== null) latestPrices[ticker] = currentPrice;
                    portfolioValue += net_shares * latestPrices[ticker];
                }
            })
            if (portfolioValue === 0) {
                chartData.push({ label: histroyItem.label, close: null });
            } else {
                chartData.push({ label: histroyItem.label, close: portfolioValue });
            }
        })
        debugger
        this.setState({chartData});
    }

    render() {
        const {companies, recentTransactions, watchlists} = this.props;
        const {quotes, data, chartData} = this.state;
        let graphColor = "green";
        let latestPrice = 0;
        let startPrice = 0;
        let priceChange = 0;
        let priceChangePercent = 0;

        if (Object.keys(data).length > 0 && chartData.length === 0){
            this.createChartData();
            debugger
        } 

        if(chartData.length > 0){
            latestPrice = chartData[chartData.length-1].close;
            startPrice = chartData[0].close;
            priceChange = Number((latestPrice - startPrice).toFixed(2));
            priceChangePercent = (priceChange / startPrice * 100).toFixed(2);
            graphColor = priceChange > 0 ? "green" : "red";
            debugger
        }

        // debugger
        return (
            <div className="logged-in-page-container">
                <NavBar user={this.props.user} fetchCompanies={false} />
                <section className="logged-in-page-content-container">
                    <section className='logged-in-page-content-left-section'>

                        <h2>{latestPrice ? "$".concat(latestPrice.toLocaleString()) : latestPrice}</h2>
                        <h4>{
                            priceChange ?
                                (priceChange > 0 ? "+"
                                    .concat("$", priceChange.toLocaleString(), ` (${priceChangePercent}%)`) : 
                                    "-".concat("$", (priceChange * -1).toLocaleString(), ` (${priceChangePercent}%)`)
                                ) : priceChange} </h4>
                        <Chart data={chartData} graphColor={graphColor} startPrice={startPrice} />
                        <br />
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

                        </section>

                        <h3>Recent News</h3>
                        <News news={this.state.news} />
                    </section>
                    
                    <section className="logged-in-page-content-right-section">
                        <PortfolioSummary 
                            transactions={recentTransactions} 
                            watchlists={watchlists} 
                            quotes={quotes} 
                            companies={companies} 
                        />
                    </section>
                </section>
            </div>
        )
    }
}

const msp = (state, ownProps) => {
    const recentTransactions = Object.values(state.entities.transactions.recentTransactions);
    const watchlists = Object.values(state.entities.watchlists.allWatchlists);
    const companies = {};

    // when companies data is received from the backend and is in the global store
    // check for recent transactions and watchlists items
    // adds the transaction or watchlist company to the full list of companies
    if (Object.keys(state.entities.companies).length) {
        recentTransactions.forEach(transaction => {
            const companyId = transaction.company_id;
            companies[companyId] = state.entities.companies[companyId];
        })
        watchlists.forEach(watchlist => {
            const companyId = watchlist.company_id;
            companies[companyId] = state.entities.companies[companyId];
        } )    
    }
               
    return {
        recentTransactions,
        watchlists,
        companies,
        user: state.entities.user[state.session.currentUserId],
    }
}

const mdp = dispatch => {
    return {
        logoutUser: () => dispatch(logoutUser()),
        fetchTransactions: () => dispatch(fetchTransactions()),
        fetchCompaniesInfo: () => dispatch(fetchCompaniesInfo()),
        fetchAllWatchlists: () => dispatch(fetchAllWatchlists()),
    }
}

export default withRouter(connect(msp, mdp)(DashboardPage));