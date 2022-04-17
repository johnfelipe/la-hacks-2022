const config = {
  type: 'line',
  data: {
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
  },
  options: {
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
};

const myChart = new Chart(
  document.getElementById('myChart'),
  config
);