import React, { Component } from 'react';
import { Segment, Grid, Header, Icon } from 'semantic-ui-react';
import { 
  ScatterChart, 
  Scatter, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  XAxis, 
  YAxis, 
  ZAxis, 
  ReferenceLine, 
  ReferenceDot, 
  ReferenceArea
} from 'recharts';


export default class Chart extends Component {
  _renderClass = (item, index) => {
    return <Scatter key={index} name={item.className} data={item.data} fillOpacity={0.3} fill={item.color} />
  }

  componentDidMount() {
  }

  render() {
    return (
      <Segment style={{margin:50}}>
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={10}>
              <ScatterChart width={400} height={400} margin={{ top: 20, right: 20, bottom: 0, left: 20 }}>
                <XAxis type="number" dataKey="x" name="stature" unit="?" />
                <YAxis type="number" dataKey="y" name="weight" unit="?" />
                <ZAxis type="number" dataKey="z" name="key" />
                <CartesianGrid />
                <Tooltip />
                <Legend/>
                {this.props.classes.map((item, index) => this._renderClass(item, index))}
              </ScatterChart>
            </Grid.Column>
            <Grid.Column width={6}>
            <Header as='h5' icon textAlign='center'>
              <Icon name='picture' circular />
              <Header.Content>
                Molecule
              </Header.Content>
            </Header>
              <center>
                <canvas className="ChemDoodleWebComponent" id="transformDistance">This browser does not support HTML5/Canvas.</canvas>
              </center>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}