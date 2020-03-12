import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Container, MenuItem, TextField } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import './FilterControls.scss';
import { updateFilters } from '../../actions/actions';

const isActiveValues = [
  {
    value: 'all',
    label: 'all',
  },
  {
    value: 'active',
    label: 'active',
  },
  {
    value: 'inactive',
    label: 'inactive',
  },
];

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
  const [searchText, setSearchText] = useState('');

  console.log(filterCriteria);

  function update(changedFilter) {
    updateFilters({
      searchText: filterCriteria.searchText,
      isActive: filterCriteria.isActive,
      framework: filterCriteria.framework,
      ...changedFilter,
    });
  }

  function handleSearchTextBlur() {
    update({ searchText });
  }

  function handleSearchTextChange(event) {
    setSearchText(event.target.value);
  }

  function handleIsActiveChange(_event, value) {
    update({ isActive: value });
  }

  function handleFrameworkChange(event) {
    update({ framework: event.target.value });
  }

  return (
    <Container className="filter-controls">

      <TextField
        className="filter-controls__item"
        id="search-text"
        label="Filter text"
        value={searchText}
        onChange={handleSearchTextChange}
        onBlur={handleSearchTextBlur}
      />

      <ToggleButtonGroup
        className="filter-controls__item"
        value={filterCriteria.isActive}
        exclusive
        onChange={handleIsActiveChange}
        aria-label="text alignment"
      >
        {isActiveValues.map((option) => (
          <ToggleButton
            key={option.value}
            value={option.value}
            selected={option.value === filterCriteria.isActive}
          >
            {option.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <TextField
        className="filter-controls__item"
        id="framework"
        select
        label="Framework"
        value={filterCriteria.framework}
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
