import React, { Component } from 'react';

import MoveApi from '../../services/moveiApi';
import './geners.css';

class Generes extends Component {
  constructor(props) {
    super(props);
    this.moveApi = new MoveApi();
  }

  state = {
    genresData: [],
    loading: true,
  };

  async fetchGenres() {
    try {
      const genresData = await this.moveApi.getGenres();
      this.setState({ genresData, loading: false });
    } catch (error) {
      console.error('Error fetching genres:', error);
      this.setState({ loading: false });
    }
  }

  render() {
    const { genre_ids } = this.props;
    const { genresData, loading } = this.state;

    if (loading) {
      this.fetchGenres();
      return <p>Loading genres...</p>;
    }

    return (
      <div className="listItem__geners">
        {genre_ids.map((id, index) => (
          <h4 key={index} className="listItem__genersItem">
            {genresData.find((genre) => genre.id === id)?.name}
          </h4>
        ))}
      </div>
    );
  }
}

export default Generes;
