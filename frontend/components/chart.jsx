import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const Chart = ({data}) => {

    function CustomToolTip({ label, payload, active, coordinate }) {
        if (active && payload.length) {
            // debugger
            return (
                <div>
                    <span className="time-data"
                        style={{ "position": "absolute", "left": `${coordinate.x}px` }}
                    >{label}</span>
                    <span className="price-data">{payload[0].value}</span>
                </div>
            );
        } else {
            return null;
        }
    }
    // debugger
    return (
        <LineChart
            width={700}
            height={200}
            data={data}
            margin={{
                top: 5, right: 5, bottom: 5, left: 5,
            }}>

            <XAxis dataKey="label" hide={true}/>
            <YAxis hide={true} type='number' domain={['dataMin', 'dataMax']} />
            <Tooltip content={<CustomToolTip />} wrapperStyle={{ 'transform': "none !important", "translate": "none !important" }} />
            <Line type="linear" dataKey='close' stroke="#00ea9c" strokeWidth="2" dot={false} />
        </LineChart>
    )
}

export default Chart;