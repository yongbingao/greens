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
            chartData: {
                "1D": [],
                "1W": [],
                "1M": [],
                "3M": [],
            },
            timeframeFocus: "1D",
            portfolioHistroy: [],  
            openPositionCompanyId: [],
            numberOfOpenPositions: 0,  
            news: [],
            intervalFunction: null,
            quotes: {},
            numberOfCompanies: 0,
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
            let tickerList = [];
            this.state.openPositionCompanyId.forEach(companyId => {
                if(companies[companyId]) tickerList.push(companies[companyId].ticker);
            });
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

        const createHistoryEntry = (currentTimeEpoch) => {
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
        }

        while (portfolioHistroy.length < 390) {
            const currentTimeEpoch = startTimeEpoch + minCounter * 60 * 1000;

            if (i >= allTransactions.length) {
                createHistoryEntry(currentTimeEpoch);
                minCounter++;
                continue;
            }
            const { company_id, created_at } = allTransactions[i];
            const createdAtEpoch = (new Date(created_at)).getTime();

            if (createdAtEpoch <= currentTimeEpoch) {
                openPositionList[company_id] = allTransactions[i];
                i++;
            } else {
                createHistoryEntry(currentTimeEpoch);
                minCounter++;
            }
        }
        this.setState({ 
            portfolioHistroy,
            openPositionCompanyId: Object.keys(openPositionList)
        })
    }

    setupMultiDayChart(allTransactions, timeframe) {
        const openPositionList = {};
        const portfolioHistroy = [];

        const currentTime = new Date;
        const currentDate = new Date((currentTime).toLocaleDateString()); // sets current date to be at midnight of current date
        const currentDateFourAM = new Date(currentDate.getTime() + 4*60*60*1000);
        let startTimeEpoch;
        let numOfDays = 0;

        // IEX previous day data updates at 4am, check the current time to set up the most recent day with data
        if(currentTime.getTime() > currentDateFourAM.getTime()){
            startTimeEpoch = currentDateFourAM.getTime() - 24*60*60*1000;
        } else {
            startTimeEpoch = currentDateFourAM.getTime() - 48*60*60*1000;
        }

        // revert starting date depending on the number of days of data requested
        if(timeframe === "1W") {
            startTimeEpoch -= 6*24*60*60*1000;
            numOfDays = 7;
        } else if(timeframe === "1M") {
            startTimeEpoch -= 29*24*60*60*1000;
            numOfDays = 30;
        } else if(timeframe === "3M") {
            startTimeEpoch -= 89*24*60*60*1000;
            numOfDays = 90;
        }

        let i = 0;
        let dayCounter = 0;

        const createHistoryEntry = (currentTimeDateFormat) => {
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
        }

        while (dayCounter < numOfDays) {
            const currentTimeEpoch = startTimeEpoch + dayCounter * 24 * 60 * 60 * 1000;
            const currentTimeDateFormat = new Date(currentTimeEpoch);
            // checks if date is on a weekday, skip day if it's on a weekend
            if (currentTimeDateFormat.getDay() > 5 || currentTimeDateFormat.getDay() < 1){
                dayCounter++;
                continue;
            }

            if (i >= allTransactions.length) {
                createHistoryEntry(currentTimeDateFormat);
                dayCounter++;
                continue;
            }

            const {company_id, created_at } = allTransactions[i];
            const createdAtEpoch = (new Date(created_at)).getTime();

            if (createdAtEpoch <= currentTimeEpoch) {
                openPositionList[company_id] = allTransactions[i];
                i++;
            } else {
                createHistoryEntry(currentTimeDateFormat);
                dayCounter++;
            }
        }
        this.setState({
            portfolioHistroy,
            openPositionCompanyId: Object.keys(openPositionList),
        })
    }

    getNewPrice(timeframe) {
        return event => {
            if(timeframe !== this.state.timeframeFocus){
                const companies = this.props.companies;
                const allTransactions = this.props.allTransactions;

                // this.setState({timeframeFocus: timeframe});

                let tickerList = this.state.openPositionCompanyId.map(companyId => companies[companyId].ticker);
                tickerList = tickerList.filter(ticker => ticker !== "ADDYY" && ticker !== "TCEHY"); // price data for ADDYY and TCEHY requires an upgraded account to access 
                if(timeframe === "1D"){
                    this.setupOneDayChart(allTransactions);
                    fetchBatchDayPrices(tickerList, "1D")
                        .then(resp => {
                            this.createOneDayChartData(resp);
                        })
                } else if(this.state.chartData[timeframe].length){
                    this.setState({ timeframeFocus: timeframe });
                } else {
                    let requestTimePeriod = timeframe;

                    if(timeframe === "1W") requestTimePeriod = "5D";

                    this.setupMultiDayChart(allTransactions, timeframe);                  
                    fetchBatchDayPrices(tickerList, requestTimePeriod)
                        .then(resp => {
                            this.createMultiDayChartData(resp, timeframe);
                        })
                }
            }
        }
    }

    createOneDayChartData(data){
        const chartData = [];
        const latestClosePrices = {};
        const latestOpenPrices = {};
        const newData = Object.assign({}, this.state.chartData);

        this.state.portfolioHistroy.forEach((histroyItem, index) => {
            const openPos = Object.values(histroyItem.positions);
            let label = histroyItem.label;
            let portfolioValueClose = 0;
            let portfolioValueOpen = 0;

            openPos.forEach(position => {
                const ticker = this.props.companies[position.company_id].ticker;
                const net_shares = position.net_shares;

                if (data[ticker] !== undefined && data[ticker].chart[index] !== undefined) {
                    const closePrice = data[ticker].chart[index].close || data[ticker].chart[index].marketClose;
                    const openPrice = data[ticker].chart[index].open || data[ticker].chart[index].marketOpen;
                    
                    if(closePrice !== null) latestClosePrices[ticker] = closePrice;
                    if(openPrice !== null) latestOpenPrices[ticker] = openPrice;
                    
                    portfolioValueClose += net_shares * latestClosePrices[ticker];
                    portfolioValueOpen += net_shares * latestOpenPrices[ticker];
                    label = data[ticker].chart[index].label;
                }
            })
            if (portfolioValueClose !== NaN && portfolioValueOpen !== NaN) {
                chartData.push({ label, close: portfolioValueClose, open: portfolioValueOpen });
            } else {
                let close = portfolioValueClose;
                let open = portfolioValueOpen;
                
                if(portfolioValueOpen === NaN) open = null;
                if(portfolioValueClose === NaN) close = null;

                chartData.push({label, close, open});
            }
        })
        newData["1D"] = chartData
        this.setState({chartData: newData, timeframeFocus: "1D"});
    }

    createMultiDayChartData(data, timeframe){
        const chartData = [];
        const latestClosePrices = {};
        const latestOpenPrices = {};
        const portfolioHistroy = this.state.portfolioHistroy;
        const newData = Object.assign({}, this.state.chartData);
        const oneDataset = Object.values(data)[0].chart;
        let dataIndex = 0;
        let i = 0;

        while(i < portfolioHistroy.length){
            if(oneDataset[dataIndex]["date"] > portfolioHistroy[i].label) {
                i++;
                continue;
            } else if(oneDataset[dataIndex]["date"] < portfolioHistroy[i].label){
                dataIndex++;
                continue;
            } else {
                const openPos = Object.values(portfolioHistroy[i].positions);
                const label = oneDataset[dataIndex].label;
                let portfolioValueClose = 0;
                let portfolioValueOpen = 0;

                openPos.forEach(position => {
                    const ticker = this.props.companies[position.company_id].ticker;
                    const net_shares = position.net_shares;
        
                    if (data[ticker] !== undefined && data[ticker].chart[dataIndex] !== undefined) {
                        const currentClosePrice = data[ticker].chart[dataIndex].close;
                        const currentOpenPrice = data[ticker].chart[dataIndex].open;
    
                        if (currentClosePrice !== null) latestClosePrices[ticker] = currentClosePrice;
                        if (currentOpenPrice !== null) latestOpenPrices[ticker] = currentOpenPrice;
    
                        portfolioValueClose += net_shares * latestClosePrices[ticker];
                        portfolioValueOpen += net_shares * latestOpenPrices[ticker];
                    }
                })
                chartData.push({label, close: portfolioValueClose, open: portfolioValueOpen});
                i++;
                dataIndex++;
            }
        }
        newData[timeframe] = chartData
        this.setState({ chartData: newData, timeframeFocus: timeframe });
    }

    render() {
        const {companies, recentTransactions, watchlists} = this.props;
        const {quotes, chartData, timeframeFocus} = this.state;
        const data = chartData[timeframeFocus];
        let graphColor = "green";
        let latestPrice = 0;
        let startPrice = 0;
        let priceChange = 0;
        let priceChangePercent = 0;

        if(data.length > 0){
            latestPrice = data[data.length-1].close;
            startPrice = data[0].open;
            if(latestPrice === null){
                for(let i = data.length - 2; i >= 0; i--){
                    if(data[i].close){
                        latestPrice = data[i].close;
                        break;
                    }
                }
            } 
            priceChange = Number((latestPrice - startPrice).toFixed(2));
            priceChangePercent = startPrice ? (priceChange / startPrice * 100).toFixed(2) : (priceChange / 1 * 100).toFixed(2);
            graphColor = priceChange > 0 ? "green" : "red";
        }
        const timeframeButtons = Object.keys(chartData).map(el => {
            return (
                <button
                    key={`dashboard-page-timeframe-${el}`}
                    id={`${(graphColor).concat("-", this.state.timeframeFocus == el ? `logged-in-page-timeframe-${el}` : "")}`}
                    className={"logged-in-page-timeframe-button".concat("-", graphColor)}
                    onClick={this.getNewPrice(el)}>{el}
                </button>
            )
        })

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
                        <Chart data={data} graphColor={graphColor} startPrice={startPrice} />
                        <br />
                        <section className="logged-in-page-timeframe-buttons">
                            {timeframeButtons}
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
            if(companies[companyId] !== undefined){
                companies[companyId] = state.entities.companies[companyId];
            }
        })
        watchlists.forEach(watchlist => {
            const companyId = watchlist.company_id;
            if(companies[companyId] !== undefined){
                companies[companyId] = state.entities.companies[companyId];
            }
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