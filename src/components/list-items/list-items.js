import React, { Component } from 'react';

import ListItem from '../list-item/list-item';
import MoveApi from '../../services/moveiApi';

import './list-items.css';

export default class ListItems extends Component {
  constructor() {
    super();
    this.findMovies();
  }
  state = {
    movies: null,
  };

  moveApi = new MoveApi();

  findMovies() {
    this.moveApi.getMovies('return').then((movies) => {
      this.setState({
        movies: movies,
      });
    });
  }

  render() {
    const { movies } = this.state;
    if (!movies) {
      return <div key={0}>Loading...</div>;
    }

    const items = movies.map((element) => {
      const { id, ...itemProps } = element;

      return (
        <li key={id} className="app__list list">
          <ListItem {...itemProps} />
        </li>
      );
    });
    return <ul className="listItems">{items}</ul>;
  }
}
