import React, { Component } from 'react';
import { Spin, Alert } from 'antd';

import ListItem from '../list-item/list-item';
import MoveApi from '../../services/moveiApi';

import './list-items.css';

export default class ListItems extends Component {
  state = {
    movies: [],
    loading: true,
    error: false,
  };

  componentDidMount() {
    const { inputValue, page } = this.props;
    this.findMovies(inputValue, page);
  }

  componentDidUpdate(prevProps) {
    const { inputValue, page } = this.props;
    if (inputValue !== prevProps.inputValue || page !== prevProps.page) {
      this.findMovies(inputValue, page);
    }
  }

  moveApi = new MoveApi();

  onEror = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  onRateUpdate = (movieId, value) => {
    this.setState((prevState) => ({
      movies: prevState.movies.map((movie) => {
        if (movie.id === movieId) {
          return {
            ...movie,
            rating: value,
          };
        } else {
          return movie;
        }
      }),
    }));
  };

  findMovies = (value, page) => {
    this.moveApi
      .getMovies(value, page)
      .then(({ movies, totalPages }) => {
        this.setState({
          movies: movies,
          loading: false,
          totalPages: totalPages,
        });
        this.props.onLoadMovies(totalPages);
      })
      .catch(this.onError);
  };

  render() {
    const { movies, loading, error } = this.state;
    if (loading) {
      return (
        <ul className="listItems">
          <Spin className="spin" />
        </ul>
      );
    }

    if (error) {
      return (
        <ul className="listItems">
          <Alert message="Не получилось загрузить данные" type="error" className="allert" />
        </ul>
      );
    }

    const items = movies.map((element) => {
      const { id, ...itemProps } = element;

      return (
        <li key={id} className="app__list list">
          <ListItem {...itemProps} id={id} guestId={this.props.guestId} onRateUpdate={this.onRateUpdate} />
        </li>
      );
    });

    const noItems =
      items.length === 0 ? <Alert message="Нет фильмов с таким названием" type="error" className="allert" /> : items;
    return <ul className="listItems">{noItems}</ul>;
  }
}
