import React from 'react';
import { Pagination } from 'antd';

import './pagination.css';

const PaginationMovie = ({ onPaginationChange, moviesQuantity }) => {
  return (
    <Pagination
      className="app__pagination"
      defaultCurrent={1}
      total={moviesQuantity}
      onChange={onPaginationChange}
      defaultPageSize={20}
    />
  );
};

export default PaginationMovie;
