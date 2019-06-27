import {fetchQuotes, fetchBatchNews, fetchBatchDayPrices} from '../../util/prices_api_util';
import {logoutUser} from '../../actions/session_actions';
import {fetchTransactions} from '../../actions/transaction_actions';
import {fetchCompaniesInfo} from '../../actions/company_actions';
import {fetchAllWatchlists} from "../../actions/watchlist_actions";
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PortfolioSummary from "./portfolio_summary";
import NavBar from '../general_comp/nav_bar';
import Chart from '../general_comp/chart';
import News from '../general_comp/news';

class DashboardPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            chartData: [],
            timeframeFocus: "1D",
            news: [],
            intervalFunction: null,
            quotes: {},
            numberOfCompanies: 0,
            portfolioHistroy: [],  
            openPositionCompanyId: [],
            numberOfOpenPositions: 0,  
        };
        this.createOneDayChartData = this.createOneDayChartData.bind(this);
        this.createMultiDayChartData = this.createMultiDayChartData.bind(this);
        this.setupOneDayChart = this.setupOneDayChart.bind(this);
        this.setupMultiDayChart = this.setupMultiDayChart.bind(this);
        this.getNewPrice = this.getNewPrice.bind(this);
    } 
    
    componentDidMount() {
        this.props.fetchCompaniesInfo();
        this.props.fetchTransactions()
            .then(resp => {
                const allTransactions = Object.values(resp.transactions.allTransactions);
                
                this.setupOneDayChart(allTransactions);
            });
        this.props.fetchAllWatchlists();
    }

    componentWillUnmount() {
        if (this.state.intervalFunction) {
            clearInterval(this.state.intervalFunction);
        }
    }

    componentDidUpdate() {
        const companiesLength = Object.keys(this.props.companies).length;

        // checks to see if the list of companies changed based on new information from transactions or wathchlists
        if(this.state.numberOfCompanies !== companiesLength){
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
            const companies = this.props.companies;
            let tickerList = this.state.openPositionCompanyId.map(companyId => companies[companyId].ticker);
            this.setState({numberOfOpenPositions: this.state.openPositionCompanyId.length});
            tickerList = tickerList.filter(ticker => ticker !== "ADDYY" && ticker !== "TCEHY"); //remove ADDYY, price data for ADDYY requires requires an upgraded account to access 
            fetchBatchDayPrices(tickerList, "1D")
                .then(resp => {
                    this.createOneDayChartData(resp);
                })
        }

    }

    setupOneDayChart(allTransactions) {
        const openPositionList = {};
        const portfolioHistroy = [];

        const currentDate = new Date((new Date).toLocaleDateString()); // sets current date to be at midnight of current date
        const startTimeEpoch = currentDate.getTime() + 9.5 * 60 * 60 * 1000; // startTime is 9:00am of current date
        let i = 0;
        let minCounter = 0;

        while (portfolioHistroy.length < 390) {
            const currentTimeEpoch = startTimeEpoch + minCounter * 60 * 1000;

            if (i >= allTransactions.length) {
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
                continue;
            }
            const { company_id, created_at } = allTransactions[i];
            const createdAtEpoch = (new Date(created_at)).getTime();

            if (createdAtEpoch <= currentTimeEpoch) {
                openPositionList[company_id] = allTransactions[i];
                i++;
            } else {
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
        this.setState({portfolioHistroy})
        this.setState({openPositionCompanyId: Object.keys(openPositionList)})
    }

    setupMultiDayChart(allTransactions, numOfDays) {
        const openPositionList = {};
        const portfolioHistroy = [];

        const currentTime = new Date;
        const currentDate = new Date((currentTime).toLocaleDateString()); // sets current date to be at midnight of current date
        const currentDateFourAM = new Date(currentDate.getTime() + 4*60*60*1000);
        let startTimeEpoch;

        // IEX previous day data updates at 4am, check the current time to set up the most recent day with data
        if(currentTime.getTime() > currentDateFourAM.getTime()){
            startTimeEpoch = currentDateFourAM.getTime() - 24*60*60*1000;
        } else {
            startTimeEpoch = currentDateFourAM.getTime() - 48*60*60*1000;
        }

        // revert starting date depending on the number of days of data requested
        if(numOfDays === 7){
            startTimeEpoch -= 6*24*60*60*1000;
        } else if(numOfDays === 30){
            startTimeEpoch -= 29*24*60*60*1000;
        }

        let i = 0;
        let dayCounter = 0;

        while (dayCounter < numOfDays) {
            const currentTimeEpoch = startTimeEpoch + dayCounter * 24 * 60 * 60 * 1000;
            const currentTimeDateFormat = new Date(currentTimeEpoch);
            // checks if date is on a weekday, skip day if it's on a weekend
            if (currentTimeDateFormat.getDay() > 5 || currentTimeDateFormat.getDay() < 1){
                dayCounter++;
                continue;
            }

            if (i >= allTransactions.length) {
                const year = currentTimeDateFormat.getFullYear();
                let month = currentTimeDateFormat.getMonth() + 1;
                let date = currentTimeDateFormat.getDate();

                if (month < 10) month = "0".concat(month);
                if (date < 10) date = "0".concat(date);

                const formattedCurrentTime = year.toString().concat("-", month, "-", date);

                portfolioHistroy.push({
                    label: formattedCurrentTime,
                    positions: Object.assign({}, openPositionList)
                });
                dayCounter++;
                continue;
            }

            const {company_id, created_at } = allTransactions[i];
            const createdAtEpoch = (new Date(created_at)).getTime();

            if (createdAtEpoch <= currentTimeEpoch) {
                openPositionList[company_id] = allTransactions[i];
                i++;
            } else {
                const year = currentTimeDateFormat.getFullYear();
                let month = currentTimeDateFormat.getMonth() + 1;
                let date = currentTimeDateFormat.getDate();

                if (month < 10) month = "0".concat(month);
                if (date < 10) date = "0".concat(date);

                const formattedCurrentTime = year.toString().concat("-", month, "-", date);

                portfolioHistroy.push({
                    label: formattedCurrentTime,
                    positions: Object.assign({}, openPositionList)
                });
                dayCounter++;
            }
        }
        this.setState({portfolioHistroy})
        this.setState({openPositionCompanyId: Object.keys(openPositionList)})
    }

    getNewPrice(timeframe) {
        return event => {
            if(timeframe !== this.state.timeframeFocus){
                const companies = this.props.companies;
                this.setState({timeframeFocus: timeframe});

                if(timeframe === "1D"){
                    this.setupOneDayChart(this.props.allTransactions);
                    let tickerList = this.state.openPositionCompanyId.map(companyId => companies[companyId].ticker);
                    tickerList = tickerList.filter(ticker => ticker !== "ADDYY" && ticker !== "TCEHY"); //remove ADDYY, price data for ADDYY requires requires an upgraded account to access 
                    fetchBatchDayPrices(tickerList, "1D")
                        .then(resp => {
                            this.createOneDayChartData(resp);
                        })
                } else if(timeframe === "1M"){
                    this.setupMultiDayChart(this.props.allTransactions, 30);
                    let tickerList = this.state.openPositionCompanyId.map(companyId => companies[companyId].ticker);
                    tickerList = tickerList.filter(ticker => ticker !== "ADDYY" && ticker !== "TCEHY");
                    fetchBatchDayPrices(tickerList, "1M")
                        .then( resp => {
                            this.createMultiDayChartData(resp);
                        })
                } else if(timeframe === "1W"){
                    this.setupMultiDayChart(this.props.allTransactions, 7);
                    let tickerList = this.state.openPositionCompanyId.map(companyId => companies[companyId].ticker);
                    tickerList = tickerList.filter(ticker => ticker !== "ADDYY" && ticker !== "TCEHY");
                    fetchBatchDayPrices(tickerList, "5D")
                        .then(resp => {
                            this.createMultiDayChartData(resp);
                        })
                }
            }
        }
    }

    createOneDayChartData(data){
        const chartData = [];
        const latestPrices = {};

        this.state.portfolioHistroy.forEach((histroyItem, index) => {
            const openPos = Object.values(histroyItem.positions);
            let label = histroyItem.label;
            let portfolioValue = 0;
            openPos.forEach(position => {
                const ticker = this.props.companies[position.company_id].ticker;
                const net_shares = position.net_shares;
                let currentPrice;

                if (data[ticker].chart[index] !== undefined) {
                    currentPrice = data[ticker].chart[index].marketClose || data[ticker].chart[index].close;
                    if(currentPrice !== null) latestPrices[ticker] = currentPrice;
                    portfolioValue += net_shares * latestPrices[ticker];
                    label = data[ticker].chart[index].label;
                }
            })
            if (portfolioValue === 0) {
                chartData.push({ label, close: null });
            } else {
                chartData.push({ label, close: portfolioValue });
            }
        })
        this.setState({chartData});
    }

    createMultiDayChartData(data){
        const chartData = [];
        const latestPrices = {};
        const portfolioHistroy = this.state.portfolioHistroy;
        let dataOffset = 0;
        const firstData = Object.values(data)[0].chart[0];
        for(let i = 0; i < portfolioHistroy.length; i++){
            if(firstData["date"] > portfolioHistroy[i].label) {
                dataOffset++;
                continue;
            }
            
            const openPos = Object.values(portfolioHistroy[i].positions);
            const label = Object.values(data)[0].chart[i-dataOffset].label;
            let portfolioValue = 0;
            openPos.forEach(position => {
                const ticker = this.props.companies[position.company_id].ticker;
                const net_shares = position.net_shares;
                let currentPrice;
    
                if (data[ticker].chart[i-dataOffset] !== undefined) {
                    currentPrice = data[ticker].chart[i-dataOffset].close;
                    if (currentPrice !== null) latestPrices[ticker] = currentPrice;
                    portfolioValue += net_shares * latestPrices[ticker];
                }
            })
            if(portfolioValue !== 0){
                chartData.push({label, close: portfolioValue});
            }
        }
        this.setState({ chartData });
    }

    render() {
        const {companies, recentTransactions, watchlists} = this.props;
        const {quotes, chartData} = this.state;
        let graphColor = "green";
        let latestPrice = 0;
        let startPrice = 0;
        let priceChange = 0;
        let priceChangePercent = 0;

        if(chartData.length > 0){
            latestPrice = chartData[chartData.length-1].close;
            if(latestPrice === null){
                for(let i = 0; i < chartData.length; i++){
                    if(chartData[i].close === null){
                        latestPrice = chartData[i - 1].close;
                        break;
                    }
                }
            } 
            startPrice = chartData[0].close;
            priceChange = Number((latestPrice - startPrice).toFixed(2));
            priceChangePercent = (priceChange / startPrice * 100).toFixed(2);
            graphColor = priceChange > 0 ? "green" : "red";
        }

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
                                id={`${(graphColor).concat("-", this.state.timeframeFocus == "1W" ? "logged-in-page-timeframe-1W" : "")}`}
                                className={"logged-in-page-timeframe-button".concat("-", graphColor)}
                                onClick={this.getNewPrice("1W")}>1W
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
    const allTransactions = Object.values(state.entities.transactions.allTransactions);
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
        allTransactions,
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