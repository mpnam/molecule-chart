import React, { Component } from 'react';
import { Header, Message, Icon, Button } from 'semantic-ui-react';
import NotificationSystem from 'react-notification-system';

// components
import Setup from './setup';
import Chart from './chart';

// styles
import './App.css';
import logo from './resources/logo.png';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chart: "",
      database: "",
      classes: [],
      data: []
    }
  }
  
  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Setup updateChart={this.updateChart} updateDatabase={this.updateDatabase} />
        <Message icon>
          <Icon name='desktop' />
          <Message.Content>
            <Button icon labelPosition='right' onClick={this._proceedHandler}>
              Proceed
              <Icon name='play' />
            </Button>
          </Message.Content>
        </Message>
        {(this.state.classes.length > 0)?
          <Chart classes={this.state.classes} data={this.state.data} /> : null}
        <NotificationSystem ref="notificationSystem" />
      </div>
    );
  }

  updateChart = (chart) => {
    this.setState({
      chart: chart
    });
  }
  
  updateDatabase = (database) => {
    this.setState({
      database: database
    });
  }

  _proceedHandler = () => {
    if (this.state.chart === "") {
      this._notificationSystem.addNotification({
        title: "Failed",
        message: "Please upload charts data",
        level: "warning",
        position: "tr",
        autoDismiss: 2
      });
      return;
    }

      console.log("test", JSON.parse(this.state.database));
    this.setState({
      classes: JSON.parse(this.state.chart),
      data: JSON.parse(this.state.database)
    });
  }
}

export default App;
