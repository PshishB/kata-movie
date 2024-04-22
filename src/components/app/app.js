import React, { Component } from 'react';

import MoveApi from '../../services/moveiApi';
import Header from '../header/header';
import SearchMovie from '../search';
import RatedMovie from '../rated';
import './app.css';

export default class App extends Component {
  state = {
    guestId: null,
    tab: 'Search',
    genresData: [],
    genresLoading: true,
    ratedMovies: {},
  };

  moveApi = new MoveApi();

  componentDidMount() {
    this.fetchGenres();
    this.moveApi.getGuestId().then((guestId) => {
      this.setState({
        guestId,
      });
    });
  }

  async fetchGenres() {
    try {
      const genresData = await this.moveApi.getGenres();
      this.setState({ genresData, genresLoading: false });
    } catch (error) {
      console.error('Error fetching genres:', error);
      this.setState({ genresLoading: false });
    }
  }

  onRateClick = (moveId, value) => {
    this.setState((prevState) => ({
      ratedMovies: {
        ...prevState.ratedMovies,
        [moveId]: value,
      },
    }));
  };

  onHeaderClick = (value) => {
    this.setState({
      tab: value,
    });
  };

  render() {
    const { tab, guestId, genresData, genresLoading, ratedMovies } = this.state;
    if (genresLoading) {
      return <p>Loading genres...</p>;
    }
    const ShowContent = tab === 'Search' ? SearchMovie : RatedMovie;

    return (
      <div className="app">
        <Header onHeaderClick={this.onHeaderClick} />
        <ShowContent
          guestId={guestId}
          genresData={genresData}
          onRateClick={this.onRateClick}
          ratedMovies={ratedMovies}
        />
      </div>
    );
  }
}
