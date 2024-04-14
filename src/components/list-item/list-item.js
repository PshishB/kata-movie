import React from 'react';
import { format, parseISO } from 'date-fns';

import Generes from '../geners/geners';

import './list-item.css';

const ListItem = (...itemProps) => {
  const itemNededProps = itemProps[0];
  const { genre_ids, title, release_date, overview, poster_path } = itemNededProps;

  return (
    <div className="list_listItem listItem">
      <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} className="listItem__img" alt="movie img"></img>
      <div className="listItem__right">
        <h2 className="listItem__h2">{title}</h2>
        <p className="listItem__p">{release_date ? format(parseISO(release_date), 'MMMM d, y') : null}</p>
        <Generes genre_ids={genre_ids} />
        <h4 className="lisItem__h4"> {overview.length > 200 ? `${overview.slice(0, 200)}...` : overview}</h4>
      </div>
    </div>
  );
};

export default ListItem;
