import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
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
    const { history } = renderWithRouter(<App/>);
    expect(history.location.pathname).toBe('/');

    await waitFor(() => expect(screen.getByText(/tatooine/i)).toBeInTheDocument());

    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter')
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');
    const tatooine = screen.getByText(/tatooine/i);

 

    userEvent.selectOptions(columnFilter, 'diameter');
    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.type(valueFilter, '4900');
    userEvent.click(buttonFilter);
    expect(tatooine).not.toBeInTheDocument();


    
  })
  it('', () => {
    
  })
  it('', () => {
    
  })
  it('', () => {
    
  })
  it('', () => {
    
  })

})