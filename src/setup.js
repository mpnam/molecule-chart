import React, { Component } from 'react';
import { Message, Icon, Label, Segment, Form, TextArea, Grid } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';

import NotificationSystem from 'react-notification-system';

// styles
import './App.css';

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
                </Grid.Column>
                <Grid.Column width={13}>
                  <Form>
                    <TextArea placeholder='File content' style={{ minHeight: 100 }} value={this.state.chart} />
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
                    onDrop={(accepted, rejected) => { alert(accepted) }}>
                      <Label as='a' color='teal' ribbon>Database</Label>
                      <p>Drop database here. Or click to upload</p>
                  </Dropzone>
                </Grid.Column>
                <Grid.Column width={13}>
                  <Form>
                    <TextArea placeholder='File content' style={{ minHeight: 100 }} />
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

  _chartHandler = (accept, reject) => {
    console.log(reject);
    if (accept.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log('content', reader.result);
        this.setState({
          chart: reader.result
        });
        this._notificationSystem.addNotification({
          title: "Success",
          message: "File has loaded",
          level: "success",
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

      reader.readAsBinaryString(accept[0]);
    }
  }
}