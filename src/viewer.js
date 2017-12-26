import React, { Component } from 'react';


export default class Viewer extends Component {
  render() {
    return <div />;
  }

  componentDidMount() {
    window.draw(300, 300, this.props.molecule);
  }

  shouldComponentUpdate() {
    window.draw(300, 300, this.props.molecule);
    return true;
  }
}