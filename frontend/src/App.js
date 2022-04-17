// import React, { useState, useEffect } from 'react'
// import {Chart} from 'chart.js';
// import 'chartjs-adapter-luxon';
// import ChartStreaming from "chartjs-plugin-streaming";

// import BarChart from './components/BarChart'

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';
// // import faker from 'faker';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top',
//     },
//     title: {
//       display: true,
//       text: 'Chart.js Line Chart',
//     },
//   },
// };

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: labels.map(() => 100),
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: labels.map(() => 100),
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };




import React, { Component } from 'react';
import { Line, Chart } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';
import StreamingPlugin from 'chartjs-plugin-streaming';
import logo from './logo.svg';
import './App.css';

Chart.register(StreamingPlugin);

// const data = {
//   datasets: [{
//     label: 'Dataset 1',
//     backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     borderColor: 'rgb(255, 99, 132)',
//     borderDash: [8, 4],
//     fill: true,
//     data: []
//   }, {
//     label: 'Dataset 2',
//     backgroundColor: 'rgba(54, 162, 235, 0.5)',
//     borderColor: 'rgb(54, 162, 235)',
//     cubicInterpolationMode: 'monotone',
//     fill: true,
//     data: []
//   }]
// }

// const options = {
//   scales: {
//     x: {
//       type: 'realtime',
//       realtime: {
//         delay: 2000,
//         onRefresh: chart => {
//           chart.data.datasets.forEach(dataset => {
//             dataset.data.push({
//               x: Date.now(),
//               y: Math.random()
//             });
//           });
//         }
//       }
//     }
//   }
// }

// class App extends Component {
//   render() {
//     return (
//       <Line
//         data={{
//           datasets: [{
//             label: 'Dataset 1',
//             backgroundColor: 'rgba(255, 99, 132, 0.5)',
//             borderColor: 'rgb(255, 99, 132)',
//             borderDash: [8, 4],
//             fill: true,
//             data: []
//           }, {
//             label: 'Dataset 2',
//             backgroundColor: 'rgba(54, 162, 235, 0.5)',
//             borderColor: 'rgb(54, 162, 235)',
//             cubicInterpolationMode: 'monotone',
//             fill: true,
//             data: []
//           }]
//         }}
//         options={{
//           scales: {
//             x: {
//               type: 'realtime',
//               realtime: {
//                 delay: 2000,
//                 onRefresh: chart => {
//                   chart.data.datasets.forEach(dataset => {
//                     dataset.data.push({
//                       x: Date.now(),
//                       y: Math.random()
//                     });
//                   });
//                 }
//               }
//             }
//           }
//         }}
//       />
//     );
//   }
// }

// export default App;


// <block:setup:1>
const data = {
  datasets: [
    {
      label: 'Dataset 1 (Linear Interpolation)',
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
      borderColor: Utils.CHART_COLORS.red,
      borderDash: [8, 4],
      data: []
    },
    {
      label: 'Dataset 2 (Cubic Interpolation)',
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
      borderColor: Utils.CHART_COLORS.blue,
      cubicInterpolationMode: 'monotone',
      data: []
    }
  ]
};

const onRefresh = chart => {
  const now = Date.now();
  chart.data.datasets.forEach(dataset => {
    dataset.data.push({
      x: now,
      y: Utils.rand(-100, 100)
    });
  });
};
// </block:setup>

// <block:actions:2>
const actions = [
  {
    name: 'Randomize',
    handler(chart) {
      chart.data.datasets.forEach(dataset => {
        dataset.data.forEach(dataObj => {
          dataObj.y = Utils.rand(-100, 100);
        });
      });
      chart.update();
    }
  },
  {
    name: 'Add Dataset',
    handler(chart) {
      const datasets = chart.data.datasets;
      const dsColor = Utils.namedColor(datasets.length);
      const newDataset = {
        label: 'Dataset ' + (datasets.length + 1),
        backgroundColor: Utils.transparentize(dsColor, 0.5),
        borderColor: dsColor,
        data: []
      };
      datasets.push(newDataset);
      chart.update();
    }
  },
  {
    name: 'Add Data',
    handler(chart) {
      onRefresh(chart);
      chart.update();
    }
  },
  {
    name: 'Remove Dataset',
    handler(chart) {
      chart.data.datasets.pop();
      chart.update();
    }
  },
  {
    name: 'Remove Data',
    handler(chart) {
      chart.data.datasets.forEach(dataset => {
        dataset.data.shift();
      });
      chart.update();
    }
  }
];
// </block:actions>

// <block:config:0>
const config = {
  type: 'line',
  data: data,
  options: {
    scales: {
      x: {
        type: 'realtime',
        realtime: {
          duration: 20000,
          refresh: 1000,
          delay: 2000,
          onRefresh: onRefresh
        }
      },
      y: {
        title: {
          display: true,
          text: 'Value'
        }
      }
    },
    interaction: {
      intersect: false
    }
  }
};
// </block:config>

config.options.plugins = {
  annotation: false,
  datalabels: false,
  zoom: false
};

module.exports = {
  actions: actions,
  config: config
};

function App() {
  return (
    <div className="App">
      {/* <p>Hello World</p> */}
      <Line options={options} data={data} />
    </div>
  );
}

export default App;