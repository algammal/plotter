import React, { Component } from "react";
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'

const state = {
    labels: ['January', 'February', 'March',
        'April', 'May'],
    datasets: [
        {
            label: 'Rainfall',
            fill: false,
            lineTension: 0,
            backgroundColor: '#9c50e5',
            borderColor: '#5c5b5dff',
            borderWidth: 1,
            data: [65, 59, 80, 81, 56]
        }
    ]
}

class ChartComp extends Component {
    render() {
        return (
            <div>
                <Line
                    data={state}
                    options={{
                        title: {
                            display: true,
                            text: 'Average Rainfall per month',
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}
                />
            </div>
        );
    }
}
export default ChartComp;