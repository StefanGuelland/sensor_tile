import React, { Component } from 'react';
import 'moment/locale/de'; // Wichtig da sonst keine lokale Zeit!
import moment from 'moment';

import GraphMarker from './GraphMarker';

import {Chart, Dots, Lines, Ticks, Labels, Layer, Handlers} from 'rumble-charts';

class SensorGraph extends Component {
    constructor(props, context){
        super(props, context);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }


    hovered = null;
    hideHovered() {
        if (this.hovered && this.hovered.circle) {
            this.hovered.circle.setAttribute('r', this.hovered.radius);
            this.hovered.circle.style.fillOpacity = this.hovered.opacity;
            if (this.hovered.label) {
                this.hovered.label.style.display = 'none';
            }
        }
    }

    handleMouseMove({closestPoints}) {
        const {className} = this.props;
        const closest = closestPoints[0];
        if (!closest) {
            return;
        }
        const {seriesIndex, pointIndex} = closest;
        const circle = document.querySelector(`circle.${className}dots-circle-${seriesIndex}-${pointIndex}`);
        if (!circle) {
            return;
        }
        this.hideHovered();
        const label = document.querySelector(`text.${className}labels-label-${seriesIndex}-${pointIndex}`);
        this.hovered = {circle, label, radius: circle.getAttribute('r'), opacity: circle.style.fillOpacity};
        circle.setAttribute('r', 5);
        circle.style.fillOpacity = 1;
        if (label) {
            label.style.display = 'block';
        }
    }

    handleMouseLeave() {
        this.hideHovered();
    }

    render() {
        const {className} = this.props;

        let series = [{
            name: 'Temperatur',
            data: []
        }];

        const startDateTime = moment(this.props.startDateTime);

        const minTimestamp = startDateTime.unix();
        const maxTimestamp = startDateTime.add(1, 'd').unix();

        const width = this.props.width;
        const height= this.props.height;

        series[0].data = this.props.data;

        return (
            <Chart
                className={className}
                width={width}
                height={height}
                series={series}
                minY={this.props.minY}
                maxY={this.props.maxY}
                minX={minTimestamp}
                maxX={maxTimestamp}
            >
                <Layer
                    position={[50,20]}
                    width={width - 100}
                    height={height - 40}
                >
                    <Handlers
                        onMouseMove={this.handleMouseMove}
                        onMouseLeave={this.handleMouseLeave}
                        optimized={false}
                    >
                        <Ticks
                            axis='y'
                            ticks={{maxTicks: 10}}
                            // tickVisible={({tick}) => tick.y >= 0}
                            lineLength='100%'
                            // lineVisible={true}
                            lineStyle={{
                                stroke:'lightgray'
                            }}
                            labelStyle={{
                                textAnchor:'end',
                                alignmentBaseline:'middle',
                                fontSize:'0.85em',
                                fontFamily:'sans-serif',
                                fill:'black'
                            }}
                            labelAttributes={{
                                x: -5
                            }}
                            labelFormat={label => label}
                        />
                        <Ticks
                            axis='x'
                            ticks={{maxTicks: 8}}
                            // tickVisible={({tick}) => tick.x >= 0}
                            lineLength='100%'
                            lineOffset='-100%'
                            // lineVisible={true}
                            lineStyle={{
                                stroke:'lightgray'
                            }}
                            labelStyle={{
                                textAnchor:'middle',
                                alignmentBaseline:'middle',
                                fontSize:'0.85em',
                                fontFamily:'sans-serif',
                                fill:'black'
                            }}
                            labelAttributes={{
                                // x: -5,
                                y: +15
                            }}
                            // labelFormat={label => moment.unix(label).utc().format('HH:mm')}
                            labelFormat={label => moment.unix(label).format('HH:mm')}
                        />
                        <Lines
                            colors={['rgb(31, 119, 180)']}
                        />
                        <Dots
                            className={className + 'dots'}
                            dotStyle={{
                                transition:'all 250ms',
                                fillOpacity:0
                            }}
                        />
                        <Labels
                            className={className + 'labels'}
                            label={({point}) => point.y + " lux "}
                            //Math.round(point.y)}
                            dotStyle={{
                                alignmentBaseline:'after-edge',
                                textAnchor:'middle',
                                fontFamily:'sans-serif',
                                display: 'none'
                            }}
                            labelAttributes={{y: -4}}
                        />
                        <GraphMarker value={moment().unix()}/>
                    </Handlers>
                </Layer>
            </Chart>
        )
    }
}

export default SensorGraph;