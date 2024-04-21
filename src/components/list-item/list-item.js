import React, { Component } from 'react';
import { format, parseISO } from 'date-fns';
import { Rate } from 'antd';

import Generes from '../geners/geners';
import './list-item.css';
import MoveApi from '../../services/moveiApi';

class ListItem extends Component {
  moveApi = new MoveApi();

  onRate = (id, value, moveId) => {
    console.log(id, value, moveId);
    this.moveApi.postRate(id, value, moveId);
    const ratedMovies = { ...this.props.ratedMovies };
    ratedMovies[id] = value;
    this.props.onRateUpdate(value, moveId);
    this.setState({
      starValue: value,
    });
  };

  render() {
    const { genre_ids, title, release_date, overview, poster_path, id, guestId, vote_average } = this.props;
    console.log(vote_average);
    return (
      <div className="list_listItem listItem">
        <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} className="listItem__img" alt="movie img"></img>
        <div className="listItem__right">
          <div className="listItem__label">
            <h2 className="listItem__h2">{title}</h2>
            <p
              className={`listItem__score ${vote_average >= 7 ? 'green' : vote_average >= 5 ? 'yellow' : vote_average >= 3 ? 'orange' : 'red'}`}
            >
              {vote_average.toFixed(1)}
            </p>
          </div>
          <p className="listItem__p">{release_date ? format(parseISO(release_date), 'MMMM d, y') : null}</p>
          <Generes genre_ids={genre_ids} />
          <h4 className="lisItem__h4"> {overview.length > 120 ? `${overview.slice(0, 120)}...` : overview}</h4>
          <Rate
            allowHalf
            count={10}
            className="listItem__rate"
            onChange={(value) => this.onRate(guestId, value, id)}
            defaultValue={this.props.rating}
          />
        </div>
      </div>
    );
  }
}

export default ListItem;
