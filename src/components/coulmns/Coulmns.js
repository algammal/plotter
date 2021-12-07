import React, { Component } from "react";
import "../coulmns/coulmns.css"

class Coulmns extends Component {
    render() {
        return (
            <div className="coulmns-container">
                <div className="coulmns-header">
                    <h2 className="coulmns-title">Coulmns</h2>
                    <div className="coulmns-items"></div>
                </div>
            </div>
        )
    }
}
export default Coulmns;