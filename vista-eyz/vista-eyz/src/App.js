import React from 'react';
import DataTable from './components/DataTable';
import DataVisualization from './components/DataVisualization';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Datos de Productos</h1>
      <DataTable />
      <h2>Visualización de Datos</h2>
      <DataVisualization />
    </div>
  );
}

export default App;
