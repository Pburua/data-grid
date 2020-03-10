import React from 'react';
import { connect } from 'react-redux';

const FilterControls = (props: any) => {
  const { filterCriteria } = props;

  console.log(filterCriteria);

  return (
    <>
      <input type="text" />
      <input type="checkbox" />
      {/*  TODO: add material ui here before proceeding */}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  filterCriteria: state.filterCriteria,
});

export default connect(mapStateToProps)(FilterControls);
