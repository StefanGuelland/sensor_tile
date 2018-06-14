import React, { Component } from 'react';
import 'moment/locale/de'; // Wichtig da sonst keine lokale Zeit!
import moment from 'moment';

import SensorGraph from './SensorGraph'

class SensorGraphs extends Component {
    constructor(props, context){
        super(props, context);
    }

    render() {

        let startDateTime = moment();//"2018-06-12T00:00:00.00Z";
        startDateTime.utc();
        startDateTime.set('hour', 0);
        startDateTime.set('minute', 0);
        startDateTime.set('second', 0);
        startDateTime.set('millisecond', 0);

        const dataMap = this.props.data[moment(startDateTime).format('YYYY-MM-DD')]

        const width = 600;
        const height= 150;

        const ambientLightData = Object.keys(dataMap).map(function (currentValue, index, array) {
                const data = dataMap[currentValue];
                const timestamp = moment(data.time).unix();
                const ambientLight = data.data.ambientLight;
                return(
                    [
                        timestamp,
                        ambientLight
                    ]
                );
            },
            this);

        const temperatureData = Object.keys(dataMap).map(function (currentValue, index, array) {
                const data = dataMap[currentValue];
                const timestamp = moment(data.time).unix();
                const temperature = data.data.temperature;
                return(
                    [
                        timestamp,
                        temperature
                    ]
                );
            },
            this);

        const humidityData = Object.keys(dataMap).map(function (currentValue, index, array) {
                const data = dataMap[currentValue];
                const timestamp = moment(data.time).unix();
                const humidity = data.data.humidity;
                return(
                    [
                        timestamp,
                        humidity
                    ]
                );
            },
            this);

        const pressureData = Object.keys(dataMap).map(function (currentValue, index, array) {
                const data = dataMap[currentValue];
                const timestamp = moment(data.time).unix();
                const pressure = data.data.pressure;
                return(
                    [
                        timestamp,
                        pressure
                    ]
                );
            },
            this);


        return (
            <React.Fragment>
                {/*<div className={'svginside'} style={{maxWidth: 480 }}>*/}
                <SensorGraph
                    className={'ambientLight'}
                    data={ambientLightData}
                    startDateTime={startDateTime}
                    width={width}
                    height={height}
                    minY={0}
                    maxY={2500}
                />
                {/*</div>*/}
                <SensorGraph
                    className={'temperature'}
                    data={temperatureData}
                    startDateTime={startDateTime}
                    width={width}
                    height={height}
                    minY={10}
                    maxY={30}
                />
                <SensorGraph
                    className={'humidity'}
                    data={humidityData}
                    startDateTime={startDateTime}
                    width={width}
                    height={height}
                    minY={0}
                    maxY={100}
                />
                <SensorGraph
                    className={'pressure'}
                    data={pressureData}
                    startDateTime={startDateTime}
                    width={width}
                    height={height}
                    minY={1005}
                    maxY={1015}
                />
            </React.Fragment>
        )
    }
}

export default SensorGraphs;