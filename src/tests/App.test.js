import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import App from '../App';
import mockFetch from '../../cypress/mocks/fetch';
import renderWithRouter from './helpers/renderWithRouter';
import userEvent from '@testing-library/user-event';
import { toBeInTheDocument, toBeInTheDOM } from '@testing-library/jest-dom/dist/matchers';

describe('Testes do StarWars', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  it('01 - testa a requisição e o filtro por nome', async () => {
    const { history } = renderWithRouter(<App/>);
    expect(history.location.pathname).toBe('/');

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    const nameFilter = screen.getByTestId('name-filter');
    expect(screen.getByTestId('name-filter')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText(/tatooine/i)).toBeInTheDocument());
    const tatooine = screen.getByText(/tatooine/i);
    userEvent.type(nameFilter, 'al');
    expect(tatooine).not.toBeInTheDocument()

  })
  it('02 - testa o filtro por coluna', async () => {
    renderWithRouter(<App/>);
    await waitFor(() => expect(screen.getByText(/tatooine/i)).toBeInTheDocument());

    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter')
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');
    const tatooine = screen.getByText(/tatooine/i);
    const endor = screen.getByRole('cell', { name: /endor/i });
  
  //  const collumnFilterArray = columnFilter.childNodes.map( ({value}) => value);

    userEvent.selectOptions(columnFilter, 'diameter');
    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.type(valueFilter, '4900');
    userEvent.click(buttonFilter);
    expect(tatooine).not.toBeInTheDocument();

    const deleteButton = screen.getByRole('button', { name: /excluir/i });
    userEvent.click(deleteButton);

    expect(deleteButton).not.toBeInTheDocument();
    expect(columnFilter.children.length).toBe(5)

    userEvent.selectOptions(columnFilter, 'population');
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.type(valueFilter, '4900');
    userEvent.click(buttonFilter);

    expect(tatooine).not.toBeInTheDocument();
    expect(columnFilter.children.length).toBe(4)

    userEvent.selectOptions(columnFilter, 'rotation_period');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.type(valueFilter, '4900');
    userEvent.click(buttonFilter);

    expect(tatooine).not.toBeInTheDocument();
    expect(columnFilter.children[0].innerHTML).toBe('orbital_period')
    expect(columnFilter.children.length).toBe(3)

    userEvent.selectOptions(columnFilter, 'orbital_period');
    userEvent.click(buttonFilter);
    expect(columnFilter.children[0].innerHTML).toBe('surface_water')

    userEvent.selectOptions(columnFilter, 'surface_water');
    userEvent.click(buttonFilter);
    expect(columnFilter.children[0].innerHTML).toBe('diameter');

    userEvent.selectOptions(columnFilter, 'diameter');
    userEvent.click(buttonFilter);
    // expect(columnFilter.children[0].innerHTML).toBeUndefined();
    const deleteFilters = screen.getByTestId('button-remove-filters');

    userEvent.click(deleteFilters);
    expect(columnFilter.children[0].innerHTML).toBe('population');
    expect(columnFilter.children[1].innerHTML).toBe('orbital_period');
    expect(columnFilter.children[2].innerHTML).toBe('diameter');
    expect(columnFilter.children[3].innerHTML).toBe('rotation_period');
    expect(columnFilter.children[4].innerHTML).toBe('surface_water');
    expect(deleteButton).not.toBeInTheDocument()

    
  })
  it('03 - testa o filtro por ordem', async () => {
    renderWithRouter(<App/>);
    await waitFor(() => expect(screen.getByText(/tatooine/i)).toBeInTheDocument());

    const collumnSort = screen.getByTestId('column-sort');
    const sortAsc = screen.getByTestId('column-sort-input-asc');
    const sortDesc = screen.getByTestId('column-sort-input-desc');
    const sortBtn = screen.getByTestId('column-sort-button');


    userEvent.selectOptions(collumnSort, 'surface_water');
    userEvent.click(sortDesc);
    userEvent.click(sortBtn);

    const row = screen.getByRole('row', {
      exact: false,
      name: 'Hoth 23 549 7200 frozen 1.1 standard tundra, ice caves, mountain ranges 100 unknown https://swapi-trybe.herokuapp.com/api/films/2/ 2014-12-10T11:39:13.934000Z 2014-12-20T20:58:18.423000Z https://swapi-trybe.herokuapp.com/api/planets/4/'
    });
    
    const unknown = within(row).getByRole('cell', {
      name: /unknown/i
    });

    expect(unknown).toBeInTheDocument();

    const planetsAsc = screen.getAllByTestId('planet-name');

    expect(planetsAsc[0].innerHTML).toBe('Hoth')
    expect(planetsAsc[6].innerHTML).toBe('Endor')

    userEvent.click(sortAsc);
    userEvent.click(sortBtn);
    
    const planetsDesc = screen.getAllByTestId('planet-name');

    expect(planetsDesc[planetsDesc.length - 1].innerHTML).toBe('Coruscant')
    expect(planetsDesc[0].innerHTML).toBe('Bespin')

    userEvent.selectOptions(collumnSort, 'population');
    userEvent.click(sortAsc);
    userEvent.click(sortBtn);

  })
  it('', () => {
    
  })
  it('', () => {
    
  })
  it('', () => {
    
  })

})