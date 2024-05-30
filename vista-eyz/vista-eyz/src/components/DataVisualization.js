import React from 'react';
import BarChartComponent from './BarChartComponent';
import LineChartComponent from './LineChartComponent';
import CircularProgressBar from './CircularProgressBar';
import data from '../data';
import styled from '@emotion/styled';

const Container = styled.div`
  padding: 1rem;
  background-color: #f0f2f5;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #fff;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const DataVisualization = () => {
  return (
    <Container>
      {data.map(item => {
        const differences = [
          { competitor: 'Küpfer', value: item.Küpfer },
          { competitor: 'Constructor31', value: item.Constructor31 },
          { competitor: 'Sodimac', value: item.Sodimac },
          { competitor: 'Easy', value: item.Easy },
          { competitor: 'Construmart', value: item.Construmart },
          { competitor: 'Servimetal', value: item.Servimetal }
        ];

        const avgDifference = differences.reduce((acc, curr) => acc + curr.value, 0) / differences.length;

        return (
          <Row key={item.Id_SKU}>
            <div>{item.Id_SKU}</div>
            <BarChartComponent data={differences} />
            <LineChartComponent data={differences} />
            <CircularProgressBar percentage={Math.abs(avgDifference) * 100} text={`${(avgDifference * 100).toFixed(1)}%`} />
          </Row>
        );
      })}
    </Container>
  );
}

export default DataVisualization;
