import React, { Component } from 'react';
import base from './base.js'
import logo from './logo.svg';
import './App.css';

import SensorData from './components/SensorData';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: {}
        };
    }

    componentDidMount() {
        this.ref = base.syncState(`/nodes`,
            {
                context: this,
                state: 'nodes' // we want to sync books but not order
            });
    }

    componentWillUnmount()
    {
        base.removeBinding(this.ref);
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

          {Object.keys(this.state.nodes).map(key =>
              <SensorData
                  key={key}
                  data={this.state.nodes[key].data}
                  lastUpdate={this.state.nodes[key].lastUpdate}
              />
          )}
      </div>
    );
  }
}

export default App;

