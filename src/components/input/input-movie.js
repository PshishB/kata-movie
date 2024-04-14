import React, { Component } from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';

import './input-movie.css';

export default class InputMovie extends Component {
  constructor() {
    super();
    this.debouncedInputValue = debounce(this.handleInputChange, 500);
  }

  handleInputChange = (value) => {
    const { onInputValue } = this.props;
    onInputValue(value);
  };

  render() {
    return (
      <Input
        placeholder="Type to search..."
        onChange={(event) => {
          this.debouncedInputValue(event.target.value);
        }}
        className="app__input"
      />
    );
  }
}
