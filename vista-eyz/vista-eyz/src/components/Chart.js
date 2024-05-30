import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { data } from '../data';

const Chart = () => {
  return (
    <BarChart
      width={600}
      height={300}
      data={data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="Nombre_SKU_Eyzaguirre" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Precio_Eyzaguirre" fill="#8884d8" />
      <Bar dataKey="Precio_Küpfer" fill="#82ca9d" />
    </BarChart>
  );
};

export default Chart;
