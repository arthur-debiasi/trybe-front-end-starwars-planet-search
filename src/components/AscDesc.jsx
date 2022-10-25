import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function AscDesc() {
  const {
    handleCollumnSortSelection,
    handleRadioSort,
    handleSortBtn,
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
      </label>
      <label htmlFor="column-sort-input-asc">
        <input
          type="radio"
          name="ASC-DESC"
          id="column-sort-input-asc"
          data-testid="column-sort-input-asc"
          value="ASC"
          onChange={ handleRadioSort }
        />
        Ascendente
      </label>
      <label htmlFor="column-sort-input-desc">
        <input
          type="radio"
          name="ASC-DESC"
          id="column-sort-input-desc"
          data-testid="column-sort-input-desc"
          value="DESC"
          onChange={ handleRadioSort }
        />
        Descendente
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleSortBtn }
      >
        ORDENAR
      </button>
    </form>
  );
}
