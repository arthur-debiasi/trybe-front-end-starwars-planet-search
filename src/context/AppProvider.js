import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import AppContext from './AppContext';

const END_POINT = 'https://swapi.dev/api/planets';

export default function AppProvider({ children }) {
  const [fetchResults, setFetchResults] = useState([]);
  const [nameFilter, setNameFilter] = useState('');

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

  const value = useMemo(() => ({
    fetchResults,
    nameFilter,
    handleNameFilter,
  }), [fetchResults, nameFilter]);

  return (
    <AppContext.Provider value={ value }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
