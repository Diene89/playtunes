import React, { Component } from 'react';
import Header from '../components/Header';

class Album extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div data-testid="page-album">
        <Header />
      </div>
    );
  }
}

export default Album;
