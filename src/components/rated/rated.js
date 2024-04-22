import React, { Component } from 'react';
import { Alert, Spin } from 'antd';

import MoveApi from '../../services/moveiApi';
import ListItem from '../list-item/list-item';
import PaginationMovie from '../pagination';

export default class RatedMovie extends Component {
  state = {
    movies: null,
    loading: true,
    error: false,
    page: 1,
    moviesQuantity: null,
  };

  moveApi = new MoveApi();

  componentDidMount() {
    this.fetchMovies(this.state.page);
  }

  fetchMovies = (page) => {
    this.moveApi
      .getRated(this.props.guestId, page)
      .then(({ movies, total_results }) => {
        this.setState({ movies, loading: false, moviesQuantity: total_results });
      })
      .catch((error) => {
        console.error('Ошибка при получении рейтингованных фильмов:', error);
        this.setState({
          error: true,
          loading: false,
        });
      });
  };

  onPaginationChange = (page) => {
    this.setState(
      {
        page,
        loading: true,
      },
      () => {
        this.fetchMovies(page);
      }
    );
  };

  render() {
    const { movies, loading, error } = this.state;
    if (loading || !movies) {
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
            guestId={this.props.guestId}
            onRateUpdate={this.props.onRateUpdate}
            genresData={this.props.genresData}
          />
        </li>
      );
    });

    const noItems =
      items.length === 0 ? <Alert message="Нет фильмов с таким названием" type="error" className="allert" /> : items;

    return (
      <div className="rated">
        <ul className="listItems">{noItems}</ul>
        <PaginationMovie
          onPaginationChange={this.onPaginationChange}
          moviesQuantity={this.state.moviesQuantity}
          page={this.state.page}
          className="listItems__pag"
        />
      </div>
    );
  }
}
