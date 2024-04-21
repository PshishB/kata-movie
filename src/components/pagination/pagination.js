import React from 'react';
import { Pagination } from 'antd';

import './pagination.css';

const PaginationMovie = ({ onPaginationChange, moviesQuantity, page }) => {
  return (
    <Pagination
      className="app__pagination"
      defaultCurrent={page}
      total={moviesQuantity}
      onChange={onPaginationChange}
      defaultPageSize={20}
    />
  );
};

export default PaginationMovie;
