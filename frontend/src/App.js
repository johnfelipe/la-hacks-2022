import React, { useState, useEffect } from 'react'
import {Chart} from 'chart.js';
import 'chartjs-adapter-luxon';
import ChartStreaming from "chartjs-plugin-streaming";

import BarChart from './components/BarChart'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => 100),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => 100),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

function App() {

  Chart.register(ChartStreaming);

    // Change default options for ALL charts
  // Chart.defaults.set('plugins.streaming', {
  //   duration: 20000
  // });

  // const chart = new Chart(ctx, {
  //   options: {
  //     plugins: {
  //       // Change options for ALL axes of THIS CHART
  //       streaming: {
  //         duration: 20000
  //       }
  //     },
  //     scales: {
  //       x: {
  //         type: 'realtime',
  //         // Change options only for THIS AXIS
  //         realtime: {
  //           duration: 20000
  //         }
  //       }
  //     }
  //   }
  // });

  // const [data, setData] = useState([{}])

  // useEffect(() => {
  //   fetch("/prediction").then(
  //     res => res.json()
  //   ).then(
  //     data => {
  //       setData(data)
  //       console.log(data)
  //     }
  //   )
  // }, [])



  
  return <Line options={options} data={data} />;

}

export default App;
