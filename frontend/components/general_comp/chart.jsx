import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip} from 'recharts';

const Chart = ({data, graphColor, startPrice, range}) => {

    function CustomToolTip({ label, payload, active, coordinate }) {
        if (active && payload && payload.length) {
            let newLabel;
            let priceChange = Number((payload[0].value - startPrice).toFixed(2));
            let priceChangePercent = (priceChange / startPrice * 100).toFixed(2);
            if (["AM", "PM"].includes(label.split(" ")[1])){
                newLabel = label.concat(" ET");
            } else if (label.split(",").length < 2 ){ 
                newLabel = label.concat(", ", new Date().getFullYear() % 100);
            } else {
                newLabel = label;
            }
            return (
                <div>
                    <span className="time-data"
                        style={{ "position": "absolute", "left": `${coordinate.x}px` }}
                    >{newLabel}</span>
                    <span className="price-data">${payload[0].value.toLocaleString()}</span>
                    <span className="price-data-change">{
                        priceChange ?
                            (priceChange > 0 ? "+".concat("$", priceChange.toLocaleString(), ` (${priceChangePercent}%)`) : "-".concat("$", (priceChange * -1).toLocaleString(), ` (${priceChangePercent}%)`))
                            : priceChange}
                    </span>
                </div>
            );
        } else {
            return null;
        }
    }

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
            <Line 
                type="linear" 
                dataKey='close' 
                stroke={graphColor == "green" ? "#21ce99" : "#f45531"} 
                strokeWidth="2" 
                dot={false} />
        </LineChart>
    )
}

export default Chart;