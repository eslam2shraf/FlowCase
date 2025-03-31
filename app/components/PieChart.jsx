import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function PieChart({ labels, data}) {
  const chartData = {

      labels:labels,
      datasets: [
        {
          label: "Count",
          data: data,
          backgroundColor: [
            "rgba(65,200,237,255)",
            "rgba(84,52,234,255)",
            "rgba(9,17,94,255)",
          ],
          borderColor: [
            "rgba(65,200,237,255)",
            "rgba(84,52,234,255)",
            "rgba(9,17,94,255)",
          ],
        },
      ],
    }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels:{
          boxWidth: 20,
         padding:20,
           
          
        }
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};
