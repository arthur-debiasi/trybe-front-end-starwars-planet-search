import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function FiltersAndOrders() {
  const {
    handleNameFilter,
    handleCollumnFilter,
    handleComparisonFilter,
    handleValueFilter,
    handleFilterBtn,
  } = useContext(AppContext);
  return (
    <>
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
      <label htmlFor="collumn-filter">
        Coluna:
        {' '}
        <select
          id="collum-filter"
          data-testid="column-filter"
          onChange={ handleCollumnFilter }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="comparison-filter">
        Operador:
        {' '}
        <select
          id="comparison-filter"
          data-testid="comparison-filter"
          onChange={ handleComparisonFilter }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        Valor:
        {' '}
        <input
          type="number"
          name="value-filter"
          id="value-filter"
          data-testid="value-filter"
          defaultValue={ 0 }
          onChange={ handleValueFilter }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleFilterBtn }
      >
        FILTRAR
      </button>
    </>
  );
}
