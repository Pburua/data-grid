import React from 'react';
import UserRow from '../UserRow/UserRow';
import HeaderRow from '../HeaderRow/HeaderRow';

const RowWrapper = ({ index, style }: any) => (
  <>
    {(index === 0)
      ? <HeaderRow />
      : <UserRow index={index} style={style} />}
  </>
);

export default RowWrapper;
