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
    if (inputValue) {
      this.findMovies(inputValue, page);
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { inputValue, page, ratedMovies } = this.props;
    if (inputValue !== prevProps.inputValue || page !== prevProps.page || ratedMovies !== prevProps.ratedMovies) {
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
          ratedMovies: this.props.ratedMovies,
        });
        this.props.onLoadMovies(totalPages);
      })
      .catch(this.onError);
  };

  render() {
    const { movies, loading, error } = this.state;
    const { guestId, genresData, onRateClick, ratedMovies, inputValue, moviesQuantity } = this.props;
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
          <ListItem
            {...itemProps}
            id={id}
            guestId={guestId}
            onRateUpdate={this.onRateUpdate}
            genresData={genresData}
            onRateClick={onRateClick}
            ratedMovies={ratedMovies}
          />
        </li>
      );
    });

    if (!inputValue || moviesQuantity === null) {
      return null;
    }
    const noItems =
      items.length === 0 ? <Alert message="Нет фильмов с таким названием" type="error" className="allert" /> : items;
    return <ul className="listItems">{noItems}</ul>;
  }
}
