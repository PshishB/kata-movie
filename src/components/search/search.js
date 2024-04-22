import React, { Component } from 'react';

import InputMovie from '../input';
import ListItems from '../list-items';
import PaginationMovie from '../pagination';

export default class SearchMovie extends Component {
  state = {
    inputValue: null,
    page: 1,
    moviesQuantity: null,
  };

  onLoadMovies = (quantity) => {
    this.setState({
      moviesQuantity: Math.floor(quantity * 20),
    });
  };

  onInputValue = (value) => {
    this.setState({
      inputValue: value,
    });
  };

  onPaginationChange = (page) => {
    this.setState({
      page,
    });
  };
  render() {
    const { page, inputValue, moviesQuantity } = this.state;
    const { guestId, genresData, onRateClick, ratedMovies } = this.props;
    return (
      <div className="app__search">
        <InputMovie onInputValue={this.onInputValue} />
        <ListItems
          inputValue={inputValue}
          onLoadMovies={this.onLoadMovies}
          page={page}
          guestId={guestId}
          genresData={genresData}
          onRateClick={onRateClick}
          ratedMovies={ratedMovies}
          moviesQuantity={moviesQuantity}
        />
        <PaginationMovie onPaginationChange={this.onPaginationChange} moviesQuantity={moviesQuantity} />
      </div>
    );
  }
}
