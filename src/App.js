import React, { Component } from 'react';
import base from './base.js'
import './App.css';

import SensorData from './components/SensorData';
import SensorGraphs from "./components/SensorGraphs";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: {},
            logs: {}
        };
    }

    componentDidMount() {
        this.ref = base.syncState(`/nodes`,
            {
                context: this,
                state: 'nodes' // we want to sync books but not order
            });

        this.logRef = base.syncState(`/logs`,
            {
                context: this,
                state: 'logs' // we want to sync books but not order
            });
    }

    componentWillUnmount()
    {
        base.removeBinding(this.ref);
        base.removeBinding(this.logRef);
    }

  render() {
    return (
      <div className="App">

          {Object.keys(this.state.nodes).map(key =>
              <SensorData
                  key={key}
                  data={this.state.nodes[key].data}
                  lastUpdate={this.state.nodes[key].lastUpdate}
              />
          )}

          {Object.keys(this.state.logs).map(key =>
              <SensorGraphs
                  key={key}
                  data={this.state.logs[key]}
              />
          )}
      </div>
    );
  }
}

export default App;

