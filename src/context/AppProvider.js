import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import AppContext from './AppContext';

const END_POINT = 'https://swapi.dev/api/planets';

export default function AppProvider({ children }) {
  const [fetchResults, setFetchResults] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [collumnFilter, setCollumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState('0');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(END_POINT);
      const { results } = await data.json();
      setFetchResults(results.map((e) => {
        delete e.residents;
        return e;
      }));
    };
    fetchData();
  }, []);

  const handleNameFilter = ({ target: { value } }) => setNameFilter(value);
  const handleCollumnFilter = ({ target: { value } }) => setCollumnFilter(value);
  const handleComparisonFilter = ({ target: { value } }) => setComparisonFilter(value);
  const handleValueFilter = ({ target: { value } }) => setValueFilter(value);

  const handleFilterBtn = useCallback(
    () => {
      const filteredResults = fetchResults.filter((e) => {
        switch (comparisonFilter) {
        case 'maior que':
          return Number(e[collumnFilter]) > Number(valueFilter);
        case 'menor que':
          return Number(e[collumnFilter]) < Number(valueFilter);
        default:
          return Number(e[collumnFilter]) === Number(valueFilter);
        }
      });
      setFetchResults(filteredResults);
    },
    [collumnFilter, comparisonFilter, fetchResults, valueFilter],
  );

  const value = useMemo(() => ({
    fetchResults,
    nameFilter,
    collumnFilter,
    comparisonFilter,
    valueFilter,
    handleNameFilter,
    handleCollumnFilter,
    handleComparisonFilter,
    handleValueFilter,
    handleFilterBtn,
  }), [
    fetchResults,
    nameFilter,
    collumnFilter,
    comparisonFilter,
    valueFilter,
    handleFilterBtn,
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
