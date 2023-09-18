'use client';
import { Stats } from '@prisma/client';

import LineChart from './LineChart';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { useState, useEffect } from 'react';

Chart.register(CategoryScale);

interface StatsProps {
  stats: Stats;
}

const StocksGraph: React.FC<StatsProps> = ({ stats }) => {
  const labels = stats.map((stat: Stat) => new Date(stat.date).toLocaleTimeString('en-GB'));
  const data = stats.map((stat: Stat) => stat.normalizeScore);

  const [scoreData, setChartData] = useState({
    labels: labels,
    datasets: [
      {
        label: 'Score',
        data: data,
        backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#f0331a', '#f3ba2f', '#2a71d0'],
        borderColor: 'black',
        borderWidth: 2,
        lineTension: 0.2,
      },
    ],
  });

  useEffect(() => {
    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Score',
          data: data,
          backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#f0331a', '#f3ba2f', '#2a71d0'],
          borderColor: 'black',
          borderWidth: 2,
          lineTension: 0.2,
        },
      ],
    });
  }, [stats]);

  return (
    <div>
      <LineChart chartData={scoreData} />
    </div>
  );
};

export default StocksGraph;
