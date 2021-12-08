import React, { Component } from "react";
import "../coulmns/coulmns.css"
import { connect } from "react-redux";
import { handleGetColumns } from "../../actions/Columns"

class Coulmns extends Component {
    async componentDidMount() {
        this.props.dispatch(handleGetColumns());
    }
    render_allcoulmns() {
        const { coulmns } = this.props;
        console.log('apiiiiii', coulmns)
        const array = []
        for (const key in coulmns) {
            if (Object.hasOwnProperty.call(coulmns, key)) {
                const element = coulmns[key];
                array.push(element)
            }
        }
        return array.map((item, index) => {
            return <div className="coulmn" key={index}>{item.name}</div>
        })

    }
    render() {
        return (
            <div className="coulmns-container">
                <div className="coulmns-header">
                    <h2 className="coulmns-title">Coulmns</h2>
                </div>
                <div className="coulmns-items">
                    {this.render_allcoulmns()}
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        coulmns: state
    };
}
export default connect(mapStateToProps)(Coulmns);