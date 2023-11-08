import React from 'react';

const SearchInput = ({ name, inputValue, onChange }) => {
  return (
    <input
      type="text"
      placeholder={name}
      value={inputValue}
      onChange={onChange}
      className="search-input"
    />
  );
};

export default SearchInput;