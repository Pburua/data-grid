import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Checkbox,
  Container,
  FormControl,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
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
    value: 'yes',
    label: 'active',
  },
  {
    value: 'no',
    label: 'inactive',
  },
];

const frameworkValues = [
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

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

const FilterControls = (props: any) => {
  const { filterCriteria } = props;
  const [searchText, setSearchText] = useState('');

  function update(changedFilter) {
    updateFilters({
      searchText: filterCriteria.searchText,
      isActive: filterCriteria.isActive,
      frameworks: filterCriteria.frameworks,
      ...changedFilter,
    });
  }

  function handleSearchTextBlur() {
    // eslint-disable-next-line max-len
    if (searchText.toLowerCase() !== filterCriteria.searchText) update({ searchText: searchText.toLowerCase() });
  }

  function handleSearchTextChange(event) {
    setSearchText(event.target.value);
  }

  function handleIsActiveChange(_event, value) {
    if (value && value !== filterCriteria.isActive) update({ isActive: value });
  }

  function handleFrameworksChange(event) {
    update({
      frameworks: event.target.value,
    });
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
        size="small"
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

      {/* <TextField */}
      {/*  className="filter-controls__item" */}
      {/*  id="framework" */}
      {/*  select */}
      {/*  label="Framework" */}
      {/*  value={filterCriteria.framework} */}
      {/*  onChange={handleFrameworkChange} */}
      {/* > */}
      {/*  {frameworkValues.map((option) => ( */}
      {/*    <MenuItem key={option.value} value={option.value}> */}
      {/*      {option.label} */}
      {/*    </MenuItem> */}
      {/*  ))} */}
      {/* </TextField> */}

      <FormControl>
        <InputLabel id="demo-mutiple-checkbox-label">Framework</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={filterCriteria.frameworks}
          input={<Input />}
          MenuProps={MenuProps}
          renderValue={(selected: any) => selected.join(', ')}
          onChange={handleFrameworksChange}
        >
          {frameworkValues.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Checkbox checked={filterCriteria.frameworks.includes(option.value)} />
              <ListItemText primary={option.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

    </Container>
  );
};

const mapStateToProps = (state: any) => ({
  filterCriteria: state.filterCriteria,
});

export default connect(mapStateToProps)(FilterControls);
