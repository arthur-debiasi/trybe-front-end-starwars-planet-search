import React from 'react';
import './App.css';
import AscDesc from './components/AscDesc';
import FiltersAndOrders from './components/FiltersAndOrders';
import Table from './components/Table';
import AppProvider from './context/AppProvider';

function App() {
  return (
    <AppProvider>
      <FiltersAndOrders />
      <AscDesc />
      <Table />
    </AppProvider>
  );
}

export default App;
