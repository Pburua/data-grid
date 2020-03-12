import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Container, MenuItem, TextField } from '@material-ui/core';
import './FilterControls.scss';

const isActiveValues = [
  {
    value: 'undefined',
    label: 'both',
  },
  {
    value: 'active',
    label: 'yes',
  },
  {
    value: 'inactive',
    label: 'no',
  },
];

const FilterControls = (props: any) => {
  const { filterCriteria } = props;
  const [searchText, setSearchText]: any = useState('');
  const [isActive, setIsActive]: any = useState('undefined');

  console.log(filterCriteria);

  function log(text) {
    console.log(text);
  }

  function handleSearchTextChange(event) {
    setSearchText(event.target.value);
  }

  function handleIsActiveChange(event) {
    setIsActive(event.target.value);
    log(isActive);
  }

  return (
    <Container className="filter-controls">
      <TextField
        className="filter-controls__item"
        id="search-text"
        label="Filter text"
        value={searchText}
        onBlur={() => {
          log(searchText);
        }}
        onChange={handleSearchTextChange}
      />
      <TextField
        className="filter-controls__item"
        id="is-active"
        select
        label="Active"
        value={isActive}
        onChange={handleIsActiveChange}
      >
        {isActiveValues.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Container>
  );
};

const mapStateToProps = (state: any) => ({
  filterCriteria: state.filterCriteria,
});

export default connect(mapStateToProps)(FilterControls);
