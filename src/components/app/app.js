import React, { Component } from 'react';

import ListItems from '../list-items';
import './app.css';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <ListItems />
      </div>
    );
  }
}
