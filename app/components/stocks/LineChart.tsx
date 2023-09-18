import { Line } from 'react-chartjs-2';

function LineChart({ chartData }: any) {
  return (
    <div className="chart-container">
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              //   text: `Sist oppdatert ${new Date(lastUpdate).toLocaleString('en-GB')}`
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
