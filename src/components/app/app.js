import React, { Component } from 'react';

import ListItems from '../list-items';
import './app.css';
import Header from '../header/header';
import InputMovie from '../input';
import PaginationMovie from '../pagination';

export default class App extends Component {
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
    if (value) {
      this.setState({
        inputValue: value,
      });
    }
  };

  onPaginationChange = (page) => {
    this.setState({
      page,
    });
  };
  render() {
    const { page, inputValue, moviesQuantity } = this.state;
    return (
      <div className="app">
        <Header />
        <InputMovie onInputValue={this.onInputValue} />
        <ListItems inputValue={inputValue} onLoadMovies={this.onLoadMovies} page={page} />
        <PaginationMovie onPaginationChange={this.onPaginationChange} moviesQuantity={moviesQuantity} />
      </div>
    );
  }
}
