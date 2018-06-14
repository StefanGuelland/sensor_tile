import React, { Component } from 'react';

class GraphMarker extends Component {
    constructor(props, context){
        super(props, context);
    }

    render() {
        const {minX, maxX, layerHeight, layerWidth, value} = this.props;

        const x = (value - minX) * layerWidth / (maxX - minX);

        return (
            <React.Fragment>
                <line
                    x1={x}
                    y1={0}
                    x2={x}
                    y2={layerHeight}
                    style={{
                        stroke:'rgb(0,255,0)',
                        strokeWidth:2,
                        strokeLinecap:'round',
                        strokeDasharray:'10,10'
                    }}
                />
                <text
                    style={{textAnchor:'middle'}}
                    x={x}
                    y={-5}
                > Now
                </text>
            </React.Fragment>
        )
    }
}

export default GraphMarker;