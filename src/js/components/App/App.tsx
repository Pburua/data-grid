import React from 'react';
import UserTable from '../UserTable/UserTable';
import VirtualizationSwitcher from '../BottomPanel/BottomPanel';
import FilterControls from '../FilterControls/FilterControls';

const App = () => (
  <>
    <FilterControls />
    <UserTable />
    <VirtualizationSwitcher />
  </>
);

export default App;
