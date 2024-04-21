import React from 'react';

import './header.css';

const Header = ({ onHeaderClick }) => {
  return (
    <header className="app__header header">
      <button className="header__btn active" onClick={(event) => onHeaderClick(event.target.textContent)}>
        Search
      </button>
      <button className="header__btn" onClick={(event) => onHeaderClick(event.target.textContent)}>
        Rated
      </button>
    </header>
  );
};

export default Header;
