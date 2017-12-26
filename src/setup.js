import React, { Component } from 'react';
import { 
  Message, 
  Icon, 
  Label, 
  Segment, 
  Form, 
  TextArea, 
  Grid,
  Popup,
  Button
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

const databaseSample = [
	{"file": "9570133\n  CHEMDOOD06280922273D\n\n 68 73  0     0  0  0  0  0  0999 V2000\n   -2.7594    4.7937    4.9660 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n    0.1713   12.3898    1.1610 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n    3.9321    2.3762    5.3236 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.6821   12.1494   -3.0690 O   0  0  0  0  0  0  0  0  0  0  0  0\n    3.3046    2.3031    7.6295 N   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.0418   13.5130   -4.1490 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.2397    4.4446    5.3491 N   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.4255   12.0044   -0.3787 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.2198    2.7741    8.3844 N   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.7320   13.9210   -3.8549 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4187    3.8201    5.1425 N   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5588   11.9239   -1.0942 N   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.9049    7.6732    2.9143 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.2872    8.7871    2.0739 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.1634    5.5180    4.5392 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.0253   10.9339    0.4523 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.9373    3.3330    6.2089 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5108   12.5947   -2.1937 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.8843    6.8557    3.4783 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.4837    9.9258    2.0156 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.4440    7.4167    3.1601 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.4599    8.7219    1.3215 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4021    3.3818    7.5816 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3923   13.4003   -2.7165 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.2218    2.5988    6.2757 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6082   12.6920   -3.1835 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5149    5.7816    4.2879 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.8526   10.9991    1.2047 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8133    6.3428    3.9700 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.8290    9.7954    0.5108 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.3645    1.6047    8.1858 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.7107   13.8957   -5.3008 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.1208    4.0381    7.9279 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1027   13.5525   -2.0051 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.4188    1.1603    7.3797 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -6.0179   13.4556   -5.5382 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.3912    1.3364    9.5591 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.0857   14.7258   -6.2385 C   0  0  0  0  0  0  0  0  0  0  0  0\n    6.4854    0.4571    7.9395 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -6.6910   13.8405   -6.6977 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.4580    0.6334   10.1190 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.7590   15.1109   -7.3978 C   0  0  0  0  0  0  0  0  0  0  0  0\n    6.5052    0.1938    9.3092 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -6.0616   14.6683   -7.6275 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.9440    7.0496    3.3306 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.4191   10.0186    2.6146 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2426    8.0068    2.7190 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.1003    7.8442    1.3098 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.8722    6.1688    4.1457 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.7458    9.7027   -0.0652 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5336    3.8483    5.6286 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.1470   12.9124   -0.0240 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.1083    5.0923    7.6446 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.7326    3.4808    7.5372 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0189    4.0183    9.0198 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.4226   14.1022   -2.6678 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.2066   14.1725   -1.1131 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.6200   12.5914   -1.8221 H   0  0  0  0  0  0  0  0  0  0  0  0\n    5.4926    1.3152    6.3135 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -6.5862   12.8152   -4.8801 H   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5914    1.6647   10.2178 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.0717   15.0881   -6.0901 H   0  0  0  0  0  0  0  0  0  0  0  0\n    7.3017    0.1139    7.3104 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.7055   13.4967   -6.8783 H   0  0  0  0  0  0  0  0  0  0  0  0\n    5.4736    0.4281   11.1854 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.2692   15.7553   -8.1220 H   0  0  0  0  0  0  0  0  0  0  0  0\n    7.3358   -0.3536    9.7450 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -6.5858   14.9681   -8.5302 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1 27  1  0  0  0  0\n  2 28  1  0  0  0  0\n  3 25  2  0  0  0  0\n  4 26  2  0  0  0  0\n  5  9  1  0  0  0  0\n  5 25  1  0  0  0  0\n  5 31  1  0  0  0  0\n  6 10  1  0  0  0  0\n  6 26  1  0  0  0  0\n  6 32  1  0  0  0  0\n  7 11  1  0  0  0  0\n  7 15  1  0  0  0  0\n  7 51  1  0  0  0  0\n  8 12  1  0  0  0  0\n  8 16  1  0  0  0  0\n  8 52  1  0  0  0  0\n  9 23  2  0  0  0  0\n 10 24  2  0  0  0  0\n 11 17  2  0  0  0  0\n 12 18  2  0  0  0  0\n 13 14  1  0  0  0  0\n 13 19  2  0  0  0  0\n 13 21  1  0  0  0  0\n 14 20  2  0  0  0  0\n 14 22  1  0  0  0  0\n 15 27  2  0  0  0  0\n 15 29  1  0  0  0  0\n 16 28  2  0  0  0  0\n 16 30  1  0  0  0  0\n 17 23  1  0  0  0  0\n 17 25  1  0  0  0  0\n 18 24  1  0  0  0  0\n 18 26  1  0  0  0  0\n 19 27  1  0  0  0  0\n 19 45  1  0  0  0  0\n 20 28  1  0  0  0  0\n 20 46  1  0  0  0  0\n 21 29  2  0  0  0  0\n 21 47  1  0  0  0  0\n 22 30  2  0  0  0  0\n 22 48  1  0  0  0  0\n 23 33  1  0  0  0  0\n 24 34  1  0  0  0  0\n 29 49  1  0  0  0  0\n 30 50  1  0  0  0  0\n 31 35  2  0  0  0  0\n 31 37  1  0  0  0  0\n 32 36  2  0  0  0  0\n 32 38  1  0  0  0  0\n 33 53  1  0  0  0  0\n 33 54  1  0  0  0  0\n 33 55  1  0  0  0  0\n 34 56  1  0  0  0  0\n 34 57  1  0  0  0  0\n 34 58  1  0  0  0  0\n 35 39  1  0  0  0  0\n 35 59  1  0  0  0  0\n 36 40  1  0  0  0  0\n 36 60  1  0  0  0  0\n 37 41  2  0  0  0  0\n 37 61  1  0  0  0  0\n 38 42  2  0  0  0  0\n 38 62  1  0  0  0  0\n 39 43  2  0  0  0  0\n 39 63  1  0  0  0  0\n 40 44  2  0  0  0  0\n 40 64  1  0  0  0  0\n 41 43  1  0  0  0  0\n 41 65  1  0  0  0  0\n 42 44  1  0  0  0  0\n 42 66  1  0  0  0  0\n 43 67  1  0  0  0  0\n 44 68  1  0  0  0  0\nM  END\n\n"},
	{"file": "2519\n  CHEMDOOD06060922503D\n\n 24 25  0     0  0  0  0  0  0999 V2000\n    1.6219   -5.0913   -2.7868 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.8974   -1.1610   -3.2550 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.6521   -1.2709   -1.5226 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.9005   -3.7326   -0.4483 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.3482   -3.1332   -3.0412 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3561   -1.6725    0.2072 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.9298   -3.3025   -1.3069 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6150   -2.0401   -0.8837 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.3245   -3.9574   -2.4210 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0308   -1.7993   -2.6466 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.1228   -2.7167    0.4451 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.3455    0.0703   -1.0411 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5797   -5.0062   -0.4566 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.3428   -3.6946   -4.1974 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.8499   -2.7925    1.2423 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0030    0.0046   -0.0058 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.4303    0.5484   -1.6444 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2534    0.6797   -1.0863 H   0  0  0  0  0  0  0  0  0  0  0  0\n    4.3024   -5.0401    0.3627 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8359   -5.7960   -0.3258 H   0  0  0  0  0  0  0  0  0  0  0  0\n    4.0990   -5.1153   -1.4119 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0097   -4.7058   -4.4413 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.1710   -3.0404   -5.0581 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.4173   -3.7088   -3.9888 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  9  2  0  0  0  0\n  2 10  2  0  0  0  0\n  3  8  1  0  0  0  0\n  3 10  1  0  0  0  0\n  3 12  1  0  0  0  0\n  4  7  1  0  0  0  0\n  4 11  1  0  0  0  0\n  4 13  1  0  0  0  0\n  5  9  1  0  0  0  0\n  5 10  1  0  0  0  0\n  5 14  1  0  0  0  0\n  6  8  1  0  0  0  0\n  6 11  2  0  0  0  0\n  7  8  2  0  0  0  0\n  7  9  1  0  0  0  0\n 11 15  1  0  0  0  0\n 12 16  1  0  0  0  0\n 12 17  1  0  0  0  0\n 12 18  1  0  0  0  0\n 13 19  1  0  0  0  0\n 13 20  1  0  0  0  0\n 13 21  1  0  0  0  0\n 14 22  1  0  0  0  0\n 14 23  1  0  0  0  0\n 14 24  1  0  0  0  0\nM  END\n"}
];

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
                  <center>
                    <Button size="tiny" content='Use Sample Data' icon='pointing up' labelPosition='right' onClick={() => this._chartContentChanged(JSON.stringify(chartSample))} />
                  </center>
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
                  <center>
                    <Button size="tiny" content='Use Sample Data' icon='pointing up' labelPosition='right' onClick={() => this._databaseContentChanged(JSON.stringify(databaseSample))} />
                  </center>
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
    if (accept.length > 0) {
      this._readerHandler(accept[0], true);
    }
  }
  
  _databaseHandler = (accept, reject) => {
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
        error = validateDatabase(reader.result);
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