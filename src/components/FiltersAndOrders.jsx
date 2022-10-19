import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function FiltersAndOrders() {
  const { handleNameFilter } = useContext(AppContext);
  return (
    <label htmlFor="name-filter">
      Filtro por nome:
      {' '}
      <input
        type="text"
        name="name-filter"
        id="name-filter"
        data-testid="name-filter"
        onChange={ handleNameFilter }
      />
    </label>
  );
}
