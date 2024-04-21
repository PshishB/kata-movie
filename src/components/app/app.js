import React, { Component } from 'react';

import './app.css';
import Header from '../header/header';
import MoveApi from '../../services/moveiApi';
import SearchMovie from '../search';
import RatedMovie from '../rated';

export default class App extends Component {
  state = {
    guestId: null,
    tab: 'Search',
  };
  moveApi = new MoveApi();

  componentDidMount() {
    this.moveApi.getGuestId().then((guestId) => {
      this.setState({
        guestId,
      });
    });
  }

  onHeaderClick = (value) => {
    this.setState({
      tab: value,
    });
  };

  render() {
    console.log(this.state.tab);
    const ShowContent = this.state.tab === 'Search' ? SearchMovie : RatedMovie;
    return (
      <div className="app">
        <Header onHeaderClick={this.onHeaderClick} />
        <ShowContent guestId={this.state.guestId} />
      </div>
    );
  }
}
