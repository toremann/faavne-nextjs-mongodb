import { Line } from 'react-chartjs-2';

function LineChart({ chartData }: any) {
  return (
    <div className="chart-container">
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            title: {
              display: true,
              text: 'Score',
              font: {
                size: 18,
              },
              color: 'black',
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
}

export default LineChart;
