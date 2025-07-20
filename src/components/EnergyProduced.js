import React from 'react';
import { Line } from 'react-chartjs-2';

const EnergyProduced = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Energy Produced',
        data: [150, 180, 200, 170, 190, 220],
        borderColor: '#34d399',
        backgroundColor: 'rgba(52, 211, 153, 0.2)',
        fill: true,
      }
    ]
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Energy Produced</h3>
      <Line data={data} />
    </div>
  );
};

export default EnergyProduced;
