import React, { Component } from "react";
import "../dimensionMeasures/dimensionMeasures.css";
import Button from 'react-bootstrap/Button'


class DimensionMeasures extends Component {
    render() {
        return (
            <div className="dimensionMeasures-container">
                <div className="dimensionMeasures-mainAcontainer">
                    <div className="dimensionMeasures-draggableArea">
                        <div className="dimensionMeasures-Area"></div>
                        <Button className="dimensionMeasures-button" variant="outline-primary">Clear</Button>
                    </div>
                </div>
            </div>
        )
    }
}
export default DimensionMeasures;