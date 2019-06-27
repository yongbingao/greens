import React from 'react';
import {Link} from "react-router-dom"

const PortfolioSummary = props=> {
    const {transactions, watchlists, quotes, companies} = props;

    if(!Object.keys(quotes).length){
        return null;
    }
    const transactionList = transactions.map(transaction => {
        let ticker = null;
        let price = null;
        if (transaction.net_shares === 0) {
            return;
        }
        if (companies[transaction.company_id]) {
            ticker = companies[transaction.company_id].ticker;
        }
        if (quotes[ticker]) {
            price = (quotes[ticker].quote.latestPrice).toFixed(2);
        }
        
        return (
            <Link key={`${ticker}-stock`} className="logged-in-page-content-right-section-stock" to={`/stock/${transaction.company_id}`}>
                <section className="content-right-section-stock-left">
                    <span className='content-right-sction-stock-ticker'>{ticker}</span>
                    <span className='content-right-sction-stock-share'>{`${transaction.net_shares.toLocaleString()} Share`}</span>
                </section>
                <span className='content-right-sction-stock-price'>{`$${Number(price).toLocaleString()}`}</span>
            </Link>
        )
    })

    if (transactionList.length) transactionList.unshift(<div key="stocks-title" className="content-right-section-stock-title">Stocks</div>);

    const watchlistList = watchlists.map(watchlist => {
        let price = null;
        let ticker = null;

        if (companies[watchlist.company_id]) {
            ticker = companies[watchlist.company_id].ticker;
        }
        if (quotes[ticker]) {
            price = (quotes[ticker].quote.latestPrice).toFixed(2);
        }

        return (
            <Link key={`${ticker}-watchlist`} className="logged-in-page-content-right-section-watchlist" to={`/stock/${watchlist.company_id}`}>
                <section className="content-right-section-watchlist-left">
                    <span className='content-right-sction-watchlist-ticker'>{ticker}</span>
                </section>
                <span className='content-right-sction-watchlist-price'>{`$${Number(price).toLocaleString()}`}</span>
            </Link>
        )
    });

    if (watchlistList.length) watchlistList.unshift(<div key="watchlist-title" className="content-right-section-watchlist-title">Watchlist</div>);
    return (
        <React.Fragment>
            <ul className="logged-in-page-content-right-section-stocks">
                {transactionList}
            </ul>
            <ul className="logged-in-page-content-right-section-watchlists">
                {watchlistList}
            </ul>
        </React.Fragment>
    )
}

export default PortfolioSummary;