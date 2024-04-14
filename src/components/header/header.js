import React from 'react';

import './header.css';

const Header = () => {
  return (
    <header className="app__header header">
      <button className="header__btn">Search</button>
      <button className="header__btn">Rated</button>
    </header>
  );
};

export default Header;
