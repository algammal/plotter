import React, { Component } from "react";
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'

const chart = {
    labels: [],
    datasets: []
}

class ChartComp extends Component {
    state = chart

    componentDidUpdate(prevProps, prevState) {
        if (this.props.dimension.length !== 0 && prevProps !== this.props) {
            let data = {
                "dimension": this.props.dimension[0].name.toString(),
                "measures": []
            }
            this.props.measures.forEach(element => {
                data.measures.push(element.name.toString())
            });

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json")


            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(data),
                redirect: 'follow'
            };

            fetch("https://plotter-task.herokuapp.com/data", requestOptions)
                .then(response => response.json())
                .then(result => {
                    this.setState({
                        labels: [],
                        datasets: []
                    })
                    result[0].values.forEach(element => {
                        this.state.labels.push(element)
                    })
                    const colors = ['#2ac9c9', '#262254', '#ec4076']

                    for (let i = 1; i < result.length; i++) {
                        let point = {
                            label: '',
                            fill: false,
                            lineTension: 0,
                            backgroundColor: '#9c50e5',
                            borderColor: '#5c5b5dff',
                            borderWidth: 1,
                            data: []
                        }
                        point.backgroundColor = colors[i % 3]
                        point.borderColor = colors[i % 3]
                        point.label = result[i].name
                        result[i].values.forEach(element => {
                            point.data.push(element)
                        })
                        this.state.datasets.push(point)
                    }
                    this.setState({
                        ...this.state,
                    })
                })
                .catch(error => console.log('error', error));
        }
        if (this.props.dimension.length === 0 && prevProps.dimension !== this.props.dimension) {
            let tempState = this.state
            tempState.labels = []
            tempState.datasets = []
            this.setState(tempState)
        }
    }
    render() {
        return (
            <div>
                <Line
                    data={this.state}
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