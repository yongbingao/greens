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