import React, { Component } from 'react';
import { 
  Message, 
  Icon, 
  Label, 
  Segment, 
  Form, 
  TextArea, 
  Grid,
  Popup
} from 'semantic-ui-react';
import Dropzone from 'react-dropzone';

import NotificationSystem from 'react-notification-system';

// services
import { validateChart, validateDatabase } from './libs';

// styles
import './App.css';


const chartSample = [
  {
    "className": "Class A",
    "color": "#1C2833",
    "data": [
      { "x": 100, "y": 200, "z": 1},
      { "x": 120, "y": 100, "z": 2},
      { "x": 170, "y": 300, "z": 3}
    ]
  },
  {
    "className": "Class B",
    "color": "#943126",
    "data": [
      { "x": 140, "y": 250, "z": 1},
      { "x": 150, "y": 400, "z": 2},
      { "x": 110, "y": 280, "z": 1}
    ]
  }
];

const databaseSample = [{
	"k1": {"a":[{"x":0,"y":-0.2633,"i":"a0","l":"O"},{"x":-0.8109999999999999,"y":0.2633,"i":"a1","l":"H"},{"x":0.8109999999999999,"y":0.2633,"i":"a2","l":"H"}],"b":[{"b":0,"e":1,"i":"b0"},{"b":0,"e":2,"i":"b1"}]}
}];

export default class Setup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isWaiting: false,
      chart: "",
      database: ""
    }
  }
  
  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  render() {
    return (
      <div>
        <Message icon>
          <Icon name='upload' loading={this.state.isWaiting} />
          <Message.Content>
            <Message.Header>Upload data</Message.Header>
              JSON format.
          </Message.Content>
        </Message>

        <Segment.Group raised style={{margin:20}}>
          <Segment>
            <Grid celled>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Dropzone 
                    className="dropzone"
                    accept=".json"
                    multiple={false} 
                    ref={(node) => { this.dropzoneRef = node; }} 
                    onDrop={this._chartHandler}>
                      <Label as='a' color='blue' ribbon>Chart</Label>
                      <p>Drop chart here. Or click to upload</p>
                  </Dropzone>
                  <center>
                    <Popup
                      trigger={<Label><Icon name="pointing up" />Chart Sample</Label>}
                      content={JSON.stringify(chartSample)}
                      on='click'
                      hideOnScroll
                    />
                  </center>
                </Grid.Column>
                <Grid.Column width={13}>
                  <Form>
                    <TextArea placeholder='File content' style={{ minHeight: 100 }} value={this.state.chart} onChange={(event, text) => this._chartContentChanged(text.value)} />
                  </Form>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <Segment>
            <Grid celled>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Dropzone 
                    className="dropzone"
                    accept=".json"
                    multiple={false} 
                    ref={(node) => { this.dropzoneRef = node; }} 
                    onDrop={this._databaseHandler}>
                      <Label as='a' color='teal' ribbon>Database</Label>
                      <p>Drop database here. Or click to upload</p>
                  </Dropzone>
                  <center>
                    <Popup
                      trigger={<Label><Icon name="pointing up" />Database Sample</Label>}
                      content={JSON.stringify(databaseSample)}
                      hideOnScroll
                    />
                  </center>
                </Grid.Column>
                <Grid.Column width={13}>
                  <Form>
                    <TextArea placeholder='File content' style={{ minHeight: 100 }} value={this.state.database} onChange={(event, text) => this._databaseContentChanged(text.value)} />
                  </Form>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Segment.Group>
        <NotificationSystem ref="notificationSystem" />
      </div>
    )
  }

  _chartContentChanged = (text) => {
    this.props.updateChart(text);
    this.setState({
      chart: text
    });
  }
  
  _databaseContentChanged = (text) => {
    this.props.updateDatabase(text);
    this.setState({
      database: text
    });
  }

  _chartHandler = (accept, reject) => {
    console.log(reject);
    if (accept.length > 0) {
      this._readerHandler(accept[0], true);
    }
  }
  
  _databaseHandler = (accept, reject) => {
    console.log(reject);
    if (accept.length > 0) {
      this._readerHandler(accept[0], false);
    }
  }

  _readerHandler = (file, isChart) => {
    const reader = new FileReader();
    reader.onload = () => {
      let error = "";

      if (isChart) {
        error = validateChart(reader.result);
        if (error === "")
          this._chartContentChanged(reader.result);
      } else {
        error = validateChart(reader.result);
        if (error === "")
          this._databaseContentChanged(reader.result);
      }

      if (error === "") 
        this._notificationSystem.addNotification({
          title: "Success",
          message: "File has loaded",
          level: "success",
          position: "tr",
          autoDismiss: 2
        });
      else
        this._notificationSystem.addNotification({
          title: "Error",
          message: "Invalid Chart input: " + JSON.stringify(error),
          level: "error",
          position: "tr",
          autoDismiss: 2
        });
    };

    reader.onabort = () => {
      this._notificationSystem.addNotification({
        title: "Failed",
        message: "File reading was aborted",
        level: "warning",
        position: "tr",
        autoDismiss: 2
      });
    }

    reader.onerror = () => {
      this._notificationSystem.addNotification({
        title: "Error",
        message: "File reading has failed",
        level: "error",
        position: "tr",
        autoDismiss: 2
      });
    }

    reader.readAsBinaryString(file);
  }
}