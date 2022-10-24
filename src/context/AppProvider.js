import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import AppContext from './AppContext';

const END_POINT = 'https://swapi.dev/api/planets';

export default function AppProvider({ children }) {
  const [fetchResults, setFetchResults] = useState([]);
  const [collumnSelection, setCollumnSelection] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [collumnFilter, setCollumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState('0');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [order, setOrder] = useState({ collumn: 'population', sort: 'ASC' });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(END_POINT);
      const { results } = await data.json();
      setFetchResults(results.map((e) => {
        delete e.residents;
        return e;
      }));
    };
    setCollumnSelection([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
    fetchData();
  }, []);

  useEffect(() => {
    const updateCollumnFilter = () => setCollumnFilter(collumnSelection[0]);
    updateCollumnFilter();
  }, [collumnSelection]);

  const handleNameFilter = ({ target: { value } }) => setNameFilter(value);
  const handleCollumnFilter = ({ target: { value } }) => setCollumnFilter(value);
  const handleComparisonFilter = ({ target: { value } }) => setComparisonFilter(value);
  const handleValueFilter = ({ target: { value } }) => setValueFilter(value);

  const handleFilterByNumericValues = useCallback(() => {
    setFilterByNumericValues([
      ...filterByNumericValues,
      { comparison: comparisonFilter, collumn: collumnFilter, value: valueFilter },
    ]);
    if (collumnSelection.length > 1) {
      setCollumnSelection(collumnSelection.filter((e) => e !== collumnFilter));
      const updateCollumnFilter = () => setCollumnFilter(collumnSelection[0]);
      updateCollumnFilter();
    } else {
      setCollumnSelection([]);
    }
  }, [
    collumnSelection,
    filterByNumericValues,
    comparisonFilter,
    collumnFilter,
    valueFilter,
  ]);

  const handleFilter = useCallback(
    (array, comparison, collumn, value) => {
      const filteredResult = array.filter((e) => {
        switch (comparison) {
        case 'maior que':
          return Number(e[collumn]) > Number(value);
        case 'menor que':
          return Number(e[collumn]) < Number(value);
        default:
          return Number(e[collumn]) === Number(value);
        }
      });
      return filteredResult;
    },
    [],
  );

  const handleDeleteBtn = useCallback((collumn) => {
    setFilterByNumericValues(filterByNumericValues.filter((e) => e.collumn !== collumn));
    setCollumnSelection([...collumnSelection, collumn]);
  }, [collumnSelection, filterByNumericValues]);

  const handleDeleteFilters = useCallback(() => {
    setFilterByNumericValues([]);
    setCollumnSelection([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
  }, []);

  const handleCollumnSortSelection = useCallback((
    { target: { value } },
  ) => setOrder({ ...order, collumn: value }), [order]);

  const handleRadioSort = useCallback((
    { target: { value } },
  ) => setOrder({ ...order, sort: value }), [order]);

  const value = useMemo(() => ({
    fetchResults,
    collumnSelection,
    nameFilter,
    collumnFilter,
    comparisonFilter,
    valueFilter,
    filterByNumericValues,
    order,
    handleNameFilter,
    handleCollumnFilter,
    handleComparisonFilter,
    handleValueFilter,
    handleFilter,
    handleFilterByNumericValues,
    handleDeleteBtn,
    handleDeleteFilters,
    handleCollumnSortSelection,
    handleRadioSort,
  }), [fetchResults,
    collumnSelection,
    nameFilter,
    collumnFilter,
    comparisonFilter,
    valueFilter,
    filterByNumericValues,
    order,
    handleFilter,
    handleFilterByNumericValues,
    handleDeleteBtn,
    handleDeleteFilters,
    handleCollumnSortSelection,
    handleRadioSort,
  ]);

  return (
    <AppContext.Provider value={ value }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
