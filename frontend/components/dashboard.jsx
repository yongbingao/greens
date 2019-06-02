import React from 'react';
import { logoutUser } from '../actions/session_actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

class DashboardPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {data: []};
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(event) {
        // debugger
        this.props.logoutUser();
    }   
    
    componentDidMount() {
        fetch("https://api.iextrading.com/1.0/stock/aapl/chart/1d")
            .then(resp => resp.json())
            .then(data => this.setState({data}));
    }

    render() {
        // const data = [{ "date": "20190531", "minute": "09:30", "label": "09:30 AM", "high": 124.54, "low": 123.88, "average": 124.11, "volume": 4757, "notional": 590392.2, "numberOfTrades": 44, "marketHigh": 124.565, "marketLow": 123.69, "marketAverage": 124.198, "marketVolume": 519483, "marketNotional": 64518783.6824, "marketNumberOfTrades": 1234, "open": 124.305, "close": 124.54, "marketOpen": 124.23, "marketClose": 124.565, "changeOverTime": 0, "marketChangeOverTime": 0 }, { "date": "20190531", "minute": "09:31", "label": "09:31 AM", "high": 124.57, "low": 124.2, "average": 124.46, "volume": 2112, "notional": 262859.8, "numberOfTrades": 25, "marketHigh": 124.615, "marketLow": 124.16, "marketAverage": 124.425, "marketVolume": 78998, "marketNotional": 9829311.7678, "marketNumberOfTrades": 487, "open": 124.53, "close": 124.2, "marketOpen": 124.58, "marketClose": 124.24, "changeOverTime": 0.002820078962210896, "marketChangeOverTime": 0.0018277266944717618 }, { "date": "20190531", "minute": "09:32", "label": "09:32 AM", "high": 124.39, "low": 124.21, "average": 124.325, "volume": 800, "notional": 99460, "numberOfTrades": 10, "marketHigh": 124.45, "marketLow": 124.19, "marketAverage": 124.315, "marketVolume": 66227, "marketNotional": 8233013.295, "marketNumberOfTrades": 448, "open": 124.38, "close": 124.21, "marketOpen": 124.23, "marketClose": 124.32, "changeOverTime": 0.0017323342196438917, "marketChangeOverTime": 0.0009420441553004431 }, { "date": "20190531", "minute": "09:33", "label": "09:33 AM", "high": 124.23, "low": 124.03, "average": 124.132, "volume": 891, "notional": 110601.59, "numberOfTrades": 12, "marketHigh": 124.3, "marketLow": 124.03, "marketAverage": 124.148, "marketVolume": 88431, "marketNotional": 10978528.9327, "marketNumberOfTrades": 458, "open": 124.23, "close": 124.04, "marketOpen": 124.29, "marketClose": 124.04, "changeOverTime": 0.00017726210619616124, "marketChangeOverTime": -0.0004025829723505786 }, { "date": "20190531", "minute": "09:34", "label": "09:34 AM", "high": 124.06, "low": 123.83, "average": 123.949, "volume": 3547, "notional": 439647.015, "numberOfTrades": 32, "marketHigh": 124.11, "marketLow": 123.83, "marketAverage": 123.995, "marketVolume": 114044, "marketNotional": 14140925.9526, "marketNumberOfTrades": 548, "open": 124.05, "close": 123.845, "marketOpen": 124.03, "marketClose": 123.845, "changeOverTime": -0.0012972363226170442, "marketChangeOverTime": -0.0016344868677433514 }, { "date": "20190531", "minute": "09:35", "label": "09:35 AM", "high": 123.96, "low": 123.765, "average": 123.841, "volume": 2120, "notional": 262544.05, "numberOfTrades": 24, "marketHigh": 123.97, "marketLow": 123.76, "marketAverage": 123.858, "marketVolume": 86764, "marketNotional": 10746449.355, "marketNumberOfTrades": 472, "open": 123.82, "close": 123.96, "marketOpen": 123.85, "marketClose": 123.93, "changeOverTime": -0.0021674321166707394, "marketChangeOverTime": -0.0027375642119840033 }, { "date": "20190531", "minute": "09:36", "label": "09:36 AM", "high": 124.19, "low": 123.86, "average": 123.956, "volume": 4570, "notional": 566480.81, "numberOfTrades": 48, "marketHigh": 124.19, "marketLow": 123.86, "marketAverage": 123.984, "marketVolume": 100832, "marketNotional": 12501611.8566, "marketNumberOfTrades": 596, "open": 123.86, "close": 124.06, "marketOpen": 123.92, "marketClose": 124.03, "changeOverTime": -0.001240834743372785, "marketChangeOverTime": -0.0017230551216605634 }, { "date": "20190531", "minute": "09:37", "label": "09:37 AM", "high": 124.08, "low": 124, "average": 124.045, "volume": 917, "notional": 113749.02, "numberOfTrades": 10, "marketHigh": 124.11, "marketLow": 123.98, "marketAverage": 124.044, "marketVolume": 67920, "marketNotional": 8425058.1601, "marketNumberOfTrades": 395, "open": 124.06, "close": 124.08, "marketOpen": 124.04, "marketClose": 124.04, "changeOverTime": -0.0005237289501248709, "marketChangeOverTime": -0.0012399555548398232 }, { "date": "20190531", "minute": "09:38", "label": "09:38 AM", "high": 124.16, "low": 123.94, "average": 124.055, "volume": 3237, "notional": 401567.825, "numberOfTrades": 38, "marketHigh": 124.16, "marketLow": 123.92, "marketAverage": 124.05, "marketVolume": 77862, "marketNotional": 9658763.1242, "marketNumberOfTrades": 514, "open": 124.03, "close": 124.01, "marketOpen": 124.025, "marketClose": 123.935, "changeOverTime": -0.00044315526549023134, "marketChangeOverTime": -0.0011916455981577493 }, { "date": "20190531", "minute": "09:39", "label": "09:39 AM", "high": 123.97, "low": 123.86, "average": 123.893, "volume": 724, "notional": 89698.64, "numberOfTrades": 6, "marketHigh": 123.97, "marketLow": 123.82, "marketAverage": 123.906, "marketVolume": 46841, "marketNotional": 5803890.0222, "marketNumberOfTrades": 240, "open": 123.97, "close": 123.88, "marketOpen": 123.93, "marketClose": 123.917, "changeOverTime": -0.0017484489565707739, "marketChangeOverTime": -0.002351084558527411 }, { "date": "20190531", "minute": "09:40", "label": "09:40 AM", "high": 123.82, "low": 123.7, "average": 123.78, "volume": 1466, "notional": 181462.13, "numberOfTrades": 15, "marketHigh": 123.93, "marketLow": 123.7, "marketAverage": 123.793, "marketVolume": 71453, "marketNotional": 8845390.4059, "marketNumberOfTrades": 423, "open": 123.81, "close": 123.7, "marketOpen": 123.93, "marketClose": 123.7, "changeOverTime": -0.0026589315929417315, "marketChangeOverTime": -0.003260922076039767 }, { "date": "20190531", "minute": "09:41", "label": "09:41 AM", "high": 123.81, "low": 123.725, "average": 123.783, "volume": 1710, "notional": 211668.52, "numberOfTrades": 21, "marketHigh": 123.813, "marketLow": 123.71, "marketAverage": 123.764, "marketVolume": 46852, "marketNotional": 5798610.9739, "marketNumberOfTrades": 285, "open": 123.77, "close": 123.78, "marketOpen": 123.71, "marketClose": 123.756, "changeOverTime": -0.0026347594875513513, "marketChangeOverTime": -0.003494420200003201 }, { "date": "20190531", "minute": "09:42", "label": "09:42 AM", "high": 123.79, "low": 123.7, "average": 123.746, "volume": 1300, "notional": 160869.91, "numberOfTrades": 14, "marketHigh": 123.79, "marketLow": 123.69, "marketAverage": 123.744, "marketVolume": 49257, "marketNotional": 6095254.702, "marketNumberOfTrades": 312, "open": 123.76, "close": 123.74, "marketOpen": 123.76, "marketClose": 123.7, "changeOverTime": -0.0029328821206994144, "marketChangeOverTime": -0.003655453388943409 }
        // ]

        const { data } = this.state;

        function CustomToolTip({label, payload, active, coordinate}){
            if (active && data){
                return (
                        <div>
                            <span className="time-data" 
                            style={{"position" : "absolute", "left":`${coordinate.x}px`}}
                            >{label}</span>
                            <span className="price-data">{payload[0].value}</span>
                        </div>
                );
            } else {
                return null;
            } 
        }

        return (
            <div>
                <h1>Dashboard Page</h1>
                <button onClick={this.handleLogout}>Log Out</button>

                <br/>
                <br/>
                <LineChart style={{"marginTop": "300px"}}
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 10, right: 10, bottom: 10, left: 100,
                    }}>

                    <XAxis dataKey="label" hide={true} />
                    <YAxis hide={true} type='number' domain={['dataMin', 'dataMax']} />
                    <Tooltip content={<CustomToolTip />}  wrapperStyle={ {'transform': "none !important", "translate": "none !important"}} />
                    <Line type="linear" dataKey='marketClose' stroke="#00ea9c" dot={false}/>
                </LineChart>

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