import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function Table() {
  const {
    fetchResults,
    nameFilter,
    handleFilter,
    filterByNumericValues,
  } = useContext(AppContext);
  const arrayOfDisplay = filterByNumericValues.length < 1
    ? fetchResults : filterByNumericValues
      .reduce((acc, {
        comparison,
        collumn,
        value,
      }) => handleFilter(acc, comparison, collumn, value), fetchResults);
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {
          arrayOfDisplay
            .filter(({ name }) => name.toLowerCase().includes(nameFilter.toLowerCase()))
            .map(({
              name,
              rotation_period: rotation,
              orbital_period: orbital,
              diameter,
              climate,
              gravity,
              terrain,
              surface_water: water,
              population,
              films,
              created,
              edited,
              url,
            }) => (
              <tr key={ name }>
                <td data-testid="planet-name">
                  {name}
                </td>
                <td>
                  {rotation}
                </td>
                <td>
                  {orbital}
                </td>
                <td>
                  {diameter}
                </td>
                <td>
                  {climate}
                </td>
                <td>
                  {gravity}
                </td>
                <td>
                  {terrain}
                </td>
                <td>
                  {water}
                </td>
                <td>
                  {population}
                </td>
                <td>
                  <ul>
                    {films.map((e) => <li key={ e }>{e}</li>)}
                  </ul>
                </td>
                <td>
                  {created}
                </td>
                <td>
                  {edited}
                </td>
                <td>
                  {url}
                </td>
              </tr>
            ))
        }
      </tbody>
    </table>
  );
}
