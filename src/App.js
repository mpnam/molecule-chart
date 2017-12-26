import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

// components
import Setup from './setup';
import Demo from './demo';

// styles
import './App.css';
import logo from './resources/logo.png';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Setup />
      </div>
    );
  }
}

export default App;
