import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularProgressBar = ({ percentage, text }) => {
  return (
    <div style={{ width: 100, height: 100 }}>
      <CircularProgressbar
        value={percentage}
        text={text}
        styles={buildStyles({
          textColor: '#8884d8',
          pathColor: '#8884d8',
          trailColor: '#d6d6d6',
          textSize: '16px', // Ajuste del tamaño del texto
        })}
      />
    </div>
  );
}

export default CircularProgressBar;
