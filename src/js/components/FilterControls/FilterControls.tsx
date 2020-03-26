import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
import { updateColumnData, updateFilters } from '../../actions/actions';
import './FilterControls.scss';
import { ColumnData, FilterCriteria, ReduxStorage } from '../../store/types';

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

const FilterControls = () => {
  const [searchText, setSearchText] = useState('');

  const filterCriteria: FilterCriteria = useSelector(
    (state: ReduxStorage) => state.filterCriteria,
  );

  const columnData: ColumnData[] = useSelector(
    (state: ReduxStorage) => state.columnData,
  );

  useEffect(() => {
    setSearchText(filterCriteria.searchText);
  }, []);

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

  function handleVisibleColumnsChange(event) {
    const selectedColumns = event.target.value;
    const newColumnData = columnData.map((value) => ({
      ...value,
      visible: selectedColumns.includes(value.fieldName),
    }));

    updateColumnData(newColumnData);
  }

  return (
    <Container className="filter-controls">

      <div className="filter-controls__item">
        <TextField
          id="search-text"
          label="Filter text"
          value={searchText}
          onChange={handleSearchTextChange}
          onBlur={handleSearchTextBlur}
        />
      </div>

      <div className="filter-controls__item">
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
      </div>

      <div className="filter-controls__item">
        <FormControl>
          <InputLabel id="demo-multiple-checkbox-label">Framework</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            className="filter-controls__multiple-checkbox"
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
      </div>

      <div className="filter-controls__item">
        <FormControl>
          <InputLabel id="visible-columns-select-label">Visible columns</InputLabel>
          <Select
            labelId="visible-columns-select-label"
            id="visible-columns-select"
            className="filter-controls__multiple-checkbox"
            multiple
            value={[...columnData]
              .filter((item: ColumnData) => item.visible)
              .map((item: ColumnData) => (item.fieldName))}
            input={<Input />}
            MenuProps={MenuProps}
            renderValue={(selected: any) => selected.join(', ')}
            onChange={handleVisibleColumnsChange}
          >
            {columnData.map((option: ColumnData) => (
              <MenuItem key={option.fieldName} value={option.fieldName}>
                <Checkbox checked={option.visible} />
                <ListItemText primary={option.text} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

    </Container>
  );
};

export default FilterControls;
