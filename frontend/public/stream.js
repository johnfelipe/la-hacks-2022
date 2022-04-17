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

    const myChart = new Chart(
       document.getElementById('myChart'),
        config
      );

// // <block:config>
// const config = {
//     type: 'line',
//     data: {
//       datasets: [
//         {
//           data: []
//         },
//         {
//           data: []
//         }
//       ]
//     },
//     options: {
//       scales: {
//         x: {
//           type: 'realtime',
//           realtime: {
//             onRefresh: chart => {
//               chart.data.datasets.forEach(dataset => {
//                 dataset.data.push({
//                   x: Date.now(),
//                   y: Math.random()
//                 });
//               });
//             }
//           }
//         }
//       }
//     }
//   };
//   // </block:config>
  
//   config.options.plugins = {
//     annotation: false,
//     datalabels: false,
//     zoom: false
//   };
  
//   module.exports = {
//     config: config
//   };

//       const myChart = new Chart(
//        document.getElementById('myChart'),
//         config
//       );