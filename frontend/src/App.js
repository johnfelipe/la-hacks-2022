import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { StreamingPlugin, RealTimeScale } from "chartjs-plugin-streaming";
Chart.register(StreamingPlugin, RealTimeScale);

function App() {

  const data = {
    datasets: [{
      label: "Dataset 1",

        fill: false,
        lineTension: 0.4,
        backgroundColor: "#f44336",
        borderColor: "#f44336",
        borderJoinStyle: "miter",
        pointRadius: 0,
        showLine: true,
        data: [],
    }]
  }
  
  const options = {
    scales: {
      xAxes: [
        {
          type: "realtime",
          realtime: {
            onRefresh: function () {
              data.datasets[0].data.push({
                x: Date.now(),
                y: Math.random() * 100,
              });
            },
            delay: 300,
            refresh: 300,
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            fontFamily: "Arial",
            labelString: "Moment",
            fontSize: 20,
            fontColor: "#6c757d",
          },
          ticks: {
            max: 100,
            min: 0,
          },
        },
      ],
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
1
export default App;