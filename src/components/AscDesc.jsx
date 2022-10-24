import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function AscDesc() {
  const {
    handleCollumnSortSelection,
    handleRadioSort,
  } = useContext(AppContext);
  return (
    <form>
      <label htmlFor="collumn-sort">
        Ordenar por coluna:
        {' '}
        <select
          id="collum-filter"
          data-testid="column-sort"
          onChange={ handleCollumnSortSelection }
        >
          {[
            'population',
            'orbital_period',
            'diameter',
            'rotation_period',
            'surface_water',
          ].map((e) => (
            <option key={ `${e}-ascDesc` } value={ e }>{e}</option>
          ))}
        </select>
        <label htmlFor="column-sort-input-asc">
          Ascendente:
          {' '}
          <input
            type="radio"
            name="ASC-DESC"
            id="column-sort-input-asc"
            data-testid="column-sort-input-asc"
            value="ASC"
            onChange={ handleRadioSort }
          />
        </label>
        <label htmlFor="column-sort-input-desc">
          Descendente:
          {' '}
          <input
            type="radio"
            name="ASC-DESC"
            id="column-sort-input-desc"
            data-testid="column-sort-input-desc"
            value="DESC"
            onChange={ handleRadioSort }
          />
        </label>
      </label>
    </form>
  );
}
