import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Container, MenuItem, TextField } from '@material-ui/core';
import './FilterControls.scss';

// const isActiveValues = [
//   {
//     value: 'all',
//     label: 'all',
//   },
//   {
//     value: 'active',
//     label: 'yes',
//   },
//   {
//     value: 'inactive',
//     label: 'no',
//   },
// ];

const frameworkValues = [
  {
    value: 'all',
    label: 'all',
  },
  {
    value: 'react',
    label: 'react',
  },
  {
    value: 'angular',
    label: 'angular',
  },
  {
    value: 'both',
    label: 'both',
  },
];

const FilterControls = (props: any) => {
  const { filterCriteria } = props;
  const [searchText, setSearchText]: any = useState('');
  const [framework, setFramework]: any = useState('all');

  console.log(filterCriteria);

  function log(text) {
    console.log(text);
  }

  function handleSearchTextChange(event) {
    setSearchText(event.target.value);
  }

  function handleFrameworkChange(event) {
    setFramework(event.target.value);
    log(event.target.value);
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
        id="framework"
        select
        label="Framework"
        value={framework}
        onChange={handleFrameworkChange}
      >
        {frameworkValues.map((option) => (
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
