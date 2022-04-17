import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { StreamingPlugin, RealTimeScale } from "chartjs-plugin-streaming";
Chart.register(StreamingPlugin, RealTimeScale);

function App() {

  const data = {
    datasets: [
      {
        label: 'Dataset 1',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
        borderDash: [8, 4],
        fill: true,
        data: []
      }
    ]
  };

  const onRefresh = chart => {
    const now = Date.now();
    chart.data.datasets.forEach(dataset => {
      dataset.data.push({
        x: now,
        y: 100
      });
    });
  };
  
  const options = {
    scales: {
      x: [{
        type: 'realtime',
        title: {
          display: true,
          text: 'Time'
        },
        realtime: {
          duration: 20000,
          refresh: 1000,
          delay: 2000,
          onRefresh: onRefresh
        }
      }],
      y: [{
        type: 'realtime',
        title: {
          display: true,
          text: 'Value',
        }
      }]
    }
  }

  return (
    <div>
      <div>
        <Line data={data} options={options} width={2000} height={1000} />
      </div>
    </div>
  );
}

export default App;