import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import data from '../data';

const ScatterChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart
        width={500}
        height={300}
        margin={{
          top: 20, right: 20, bottom: 10, left: 10,
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="Id_SKU" name="SKU" />
        <YAxis type="number" dataKey="Precio Eyzaguirre" name="Precio Eyzaguirre" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter name="Precio vs SKU" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

export default ScatterChartComponent;
