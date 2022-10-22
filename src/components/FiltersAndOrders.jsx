import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function FiltersAndOrders() {
  const {
    collumnSelection,
    filterByNumericValues,
    handleNameFilter,
    handleCollumnFilter,
    handleComparisonFilter,
    handleValueFilter,
    handleFilterByNumericValues,
    handleDeleteBtn,
    handleDeleteFilters,
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
          onClick={ handleCollumnFilter }
        >
          {collumnSelection.map((e) => (
            <option key={ e } value={ e }>{e}</option>
          ))}
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
        onClick={ handleFilterByNumericValues }
      >
        FILTRAR
      </button>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ handleDeleteFilters }
      >
        Remover todas filtragens
      </button>
      {
        filterByNumericValues.map(({ comparison, collumn, value }) => (
          <div key={ `${collumn}-filter` } data-testid="filter">
            <p>{`${collumn} ${comparison} ${value}`}</p>
            <button
              type="button"
              onClick={ () => handleDeleteBtn(collumn) }
            >
              EXCLUIR
            </button>
          </div>
        ))
      }
    </>
  );
}
