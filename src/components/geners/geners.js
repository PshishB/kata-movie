import React, { Component } from 'react';
import './geners.css';

class Generes extends Component {
  render() {
    const { genre_ids, genresData } = this.props;

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
