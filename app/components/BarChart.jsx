import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function BarChart({ labels, data1, data2, label1, label2 }) {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: label1,
        data: data1,
        backgroundColor: 'rgba(65,200,237,255)', 
        borderColor: 'rgba(65,200,237,255)',
        borderWidth: 1,
      },
      {
        label: label2,
        data: data2,
        backgroundColor: 'rgba(9,17,94,255)', 
        borderColor: 'rgba(9,17,94,255)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
     
      },
    },
  };

  return <Bar data={chartData} options={options} className='w-full' />;
};
