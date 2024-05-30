import React, { useState, useMemo } from 'react';
import { useTable, useFilters, usePagination, useSortBy } from 'react-table';
import { CSVLink } from 'react-csv';
import styled from '@emotion/styled';
import data from '../data_completa'; // Asegúrate de que la ruta sea correcta

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Buscar en ${count} registros...`}
      style={{
        width: '100%',
        padding: '5px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '14px'
      }}
    />
  );
}

const Styles = styled.div`
  padding: 1rem;
  background-color: #f8f9fa;
  color: #333;

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;

    th,
    td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #ddd;

      :last-child {
        border-right: 0;
      }
    }

    th {
      background-color: #007bff;
      color: white;
      font-weight: bold;
      cursor: pointer;
    }

    tr:nth-of-type(even) {
      background-color: #f2f2f2;
    }

    tr:hover {
      background-color: #e9ecef;
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
  }

  .pagination button {
    margin: 0 0.25rem;
    padding: 0.5rem 1rem;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;

    &:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }
  }

  .pagination span {
    margin: 0 0.25rem;
  }

  .pagination input {
    width: 50px;
    padding: 0.25rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    text-align: center;
  }

  .pagination select {
    padding: 0.25rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .export-button {
    margin-bottom: 10px;
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;

    &:hover {
      background-color: #218838;
    }
  }
`;

const formatPercentage = (value) => (value == null || isNaN(value)) ? '' : `${(value * 100).toFixed(1)}%`;
const formatCurrency = (value) => (value == null || isNaN(value)) ? '' : `$${value.toLocaleString()}`;

const getColumns = (sheet) => {
  switch (sheet) {
    case 'Consolidado':
      return [
        { Header: 'Id_SKU', accessor: 'Id_SKU', Filter: DefaultColumnFilter },
        { Header: 'Nombre_SKU_Eyzaguirre', accessor: 'Nombre_SKU_Eyzaguirre', Filter: DefaultColumnFilter },
        { Header: 'Precio Eyzaguirre', accessor: 'Precio Eyzaguirre', Cell: ({ value }) => formatCurrency(value), Filter: () => null },
        { Header: 'Küpfer', accessor: 'Küpfer', Cell: ({ value }) => <span style={{ color: value < 0 ? 'red' : 'green' }}>{formatPercentage(value)}</span>, Filter: () => null },
        { Header: 'Constructor31', accessor: 'Constructor31', Cell: ({ value }) => <span style={{ color: value < 0 ? 'red' : 'green' }}>{formatPercentage(value)}</span>, Filter: () => null },
        { Header: 'Sodimac', accessor: 'Sodimac', Cell: ({ value }) => <span style={{ color: value < 0 ? 'red' : 'green' }}>{formatPercentage(value)}</span>, Filter: () => null },
        { Header: 'Easy', accessor: 'Easy', Cell: ({ value }) => <span style={{ color: value < 0 ? 'red' : 'green' }}>{formatPercentage(value)}</span>, Filter: () => null },
        { Header: 'Construmart', accessor: 'Construmart', Cell: ({ value }) => <span style={{ color: value < 0 ? 'red' : 'green' }}>{formatPercentage(value)}</span>, Filter: () => null },
        { Header: 'Servimetal', accessor: 'Servimetal', Cell: ({ value }) => <span style={{ color: value < 0 ? 'red' : 'green' }}>{formatPercentage(value)}</span>, Filter: () => null },
        
      ];
    case 'Küpfer':
      return [
        { Header: 'Id_SKU', accessor: 'Id_SKU', Filter: DefaultColumnFilter },
        { Header: 'Nombre_SKU_Eyzaguirre', accessor: 'Nombre_SKU_Eyzaguirre', Filter: DefaultColumnFilter },
        { Header: 'Precio Eyzaguirre', accessor: 'Precio Eyzaguirre', Cell: ({ value }) => formatCurrency(value), Filter: () => null },
        { Header: 'Precio Küpfer', accessor: 'Precio Küpfer', Cell: ({ value }) => formatCurrency(value), Filter: () => null },
        { Header: 'Dif $', accessor: 'Dif $', Cell: ({ value }) => formatCurrency(value), Filter: () => null },
        { Header: 'Dif %', accessor: 'Dif %', Cell: ({ value }) => <span style={{ color: value < 0 ? 'red' : 'green' }}>{formatPercentage(value)}</span>, Filter: () => null }
      ];
    case 'Constructor31':
      return [
        { Header: 'Id_SKU', accessor: 'Id_SKU', Filter: DefaultColumnFilter },
        { Header: 'Nombre_SKU', accessor: 'Nombre_SKU', Filter: DefaultColumnFilter },
        { Header: 'Precio Eyzaguirre', accessor: 'Precio Eyzaguirre', Cell: ({ value }) => formatCurrency(value), Filter: () => null },
        { Header: 'Precio Constructor31', accessor: 'Precio Constructor31', Cell: ({ value }) => formatCurrency(value), Filter: () => null },
        { Header: 'Dif $', accessor: 'Dif $', Cell: ({ value }) => formatCurrency(value), Filter: () => null },
        { Header: 'Dif %', accessor: 'Dif %', Cell: ({ value }) => <span style={{ color: value < 0 ? 'red' : 'green' }}>{formatPercentage(value)}</span>, Filter: () => null }
      ];
    case 'Sodimac':
      return [
        { Header: 'Id_SKU', accessor: 'Id_SKU', Filter: DefaultColumnFilter },
        { Header: 'Nombre_SKU_Eyzaguirre', accessor: 'Nombre_SKU', Filter: DefaultColumnFilter },
        { Header: 'Precio Eyzaguirre', accessor: 'Precio Eyzaguirre', Cell: ({ value }) => formatCurrency(value), Filter: () => null },
        { Header: 'Precio Sodimac', accessor: 'Precio Sodimac', Cell: ({ value }) => formatCurrency(value), Filter: () => null },
        { Header: 'Dif $', accessor: 'Dif $', Cell: ({ value }) => formatCurrency(value), Filter: () => null },
        { Header: 'Dif %', accessor: 'Dif %', Cell: ({ value }) => <span style={{ color: value < 0 ? 'red' : 'green' }}>{formatPercentage(value)}</span>, Filter: () => null }
      ];
    case 'Easy':
      return [
        { Header: 'Id_SKU', accessor: 'Id_SKU', Filter: DefaultColumnFilter },
        { Header: 'Nombre_SKU_Eyzaguirre', accessor: 'Nombre_SKU', Filter: DefaultColumnFilter },
        { Header: 'Precio Eyzaguirre', accessor: 'Precio Eyzaguirre', Cell: ({ value }) => formatCurrency(value), Filter: () => null },
        { Header: 'Precio Easy', accessor: 'Precio Easy', Cell: ({ value }) => formatCurrency(value), Filter: () => null },
        { Header: 'Dif $', accessor: 'Dif $', Cell: ({ value }) => formatCurrency(value), Filter: () => null },
        { Header: 'Dif %', accessor: 'Dif %', Cell: ({ value }) => <span style={{ color: value < 0 ? 'red' : 'green' }}>{formatPercentage(value)}</span>, Filter: () => null }
      ];
    case 'Construmart':
      return [
        { Header: 'Id_SKU', accessor: 'Id_SKU', Filter: DefaultColumnFilter },
        { Header: 'Nombre_SKU_Eyzaguirre', accessor: 'Nombre_SKU', Filter: DefaultColumnFilter },
        { Header: 'Precio Eyzaguirre', accessor: 'Precio Eyzaguirre', Cell: ({ value }) => formatCurrency(value), Filter: () => null },
        { Header: 'Precio Construmart', accessor: 'Precio Construmart', Cell: ({ value }) => formatCurrency(value), Filter: () => null },
        { Header: 'Dif $', accessor: 'Dif $', Cell: ({ value }) => formatCurrency(value), Filter: () => null },
        { Header: 'Dif %', accessor: 'Dif %', Cell: ({ value }) => <span style={{ color: value < 0 ? 'red' : 'green' }}>{formatPercentage(value)}</span>, Filter: () => null }
      ];
    case 'Servimetal':
      return [
        { Header: 'Id_SKU', accessor: 'Id_SKU', Filter: DefaultColumnFilter },
        { Header: 'Nombre_SKU_Eyzaguirre', accessor: 'Nombre_SKU', Filter: DefaultColumnFilter },
        { Header: 'Precio Eyzaguirre', accessor: 'Precio Eyzaguirre', Cell: ({ value }) => formatCurrency(value), Filter: () => null },
        { Header: 'Precio Servimetal', accessor: 'Precio Servimetal', Cell: ({ value }) => formatCurrency(value), Filter: () => null },
        { Header: 'Dif $', accessor: 'Dif $', Cell: ({ value }) => formatCurrency(value), Filter: () => null },
        { Header: 'Dif %', accessor: 'Dif %', Cell: ({ value }) => <span style={{ color: value < 0 ? 'red' : 'green' }}>{formatPercentage(value)}</span>, Filter: () => null }
      ];
    default:
      return [];
  }
};

const DataTable = () => {
  const [selectedSheet, setSelectedSheet] = useState('Consolidado');

  const columns = useMemo(() => getColumns(selectedSheet), [selectedSheet]);

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state: { pageIndex, pageSize },
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data: data[selectedSheet] || [],
      defaultColumn,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <Styles>
      <div>
        <label htmlFor="sheet-select">Selecciona una hoja: </label>
        <select
          id="sheet-select"
          value={selectedSheet}
          onChange={(e) => setSelectedSheet(e.target.value)}
        >
          {Object.keys(data).map(sheet => (
            <option key={sheet} value={sheet}>{sheet}</option>
          ))}
        </select>
      </div>
      <CSVLink data={data[selectedSheet] || []} headers={columns.map(col => ({ label: col.Header, key: col.accessor }))} filename="table_data.csv">
        <div className="export-button">
          Exportar a CSV
        </div>
      </CSVLink>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageOptions.length - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Página{' '}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Ir a la página:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10,20,30,40,50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Mostrar {pageSize}
            </option>
          ))}
        </select>
      </div>
    </Styles>
  );
};

export default DataTable;
