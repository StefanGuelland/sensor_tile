import React, { Component } from 'react';
import Time from 'react-time'
import 'moment/locale/de'; // Wichtig da sonst keine lokale Zeit!

class SensorData extends Component {

    componentDidMount() {
        this.interval = setInterval(() => this.forceUpdate(), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }



    render() {
        const time = this.props.lastUpdate;
        const temperature = this.props.data.temperature;
        const humidity = this.props.data.humidity;
        const pressure = this.props.data.pressure;
        const ambientLight = this.props.data.ambientLight;
        const vbat = this.props.data.vbat;

        const tinySpaceStyle = {
            fontSize: '.25em'
        };

        return (
            <div>
                <p>Letzter Empfang um <Time value={time} locale="de" format="HH:mm:ss" /></p>
                <p>Das war <Time value={time} locale="de" titleFormat="YYYY-MM-DD HH:mm" relative /></p>
                <p>Temperatur {temperature}<span style={tinySpaceStyle}>&nbsp;</span>&deg;C</p>
                <p>Luftfeuchtigkeit {humidity}<span style={tinySpaceStyle}>&nbsp;</span>%</p>
                <p>Luftdruck {pressure}<span style={tinySpaceStyle}>&nbsp;</span>hPa</p>
                <p>Umgebungslicht {ambientLight}<span style={tinySpaceStyle}>&nbsp;</span>lux</p>
                <p>Batterie Spannung: {vbat}<span style={tinySpaceStyle}>&nbsp;</span>V</p>
            </div>
        )
    }
}

export default SensorData;