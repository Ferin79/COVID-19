$(document).ready(async function () {
  await fetchFirstData();
  $(".counter").counterUp({
    delay: 10,
    time: 1000,
  });
  const data = await fetchData();
  drawGraph(data);
});

const fetchFirstData = async () => {
  const response = await fetch("https://corona.lmao.ninja/all");
  const responseData = await response.json();
  const date = new Date(responseData.updated);
  $(".date-auto").html(date.toUTCString());
  $(".infected-count").html(responseData.active);
  $(".recover-count").html(responseData.recovered);
  $(".deaths-count").html(responseData.deaths);
};
const fetchData = async () => {
  const response = await fetch("https://covid19.mathdro.id/api/daily");
  const responseData = await response.json();
  console.log(responseData);

  const confirmed = responseData.map((data) => data.confirmed.total);
  const deaths = responseData.map((data) => data.deaths.total);
  const date = responseData.map((data) => data.reportDate);

  return [confirmed, deaths, date];
};
const drawGraph = (data) => {
  $("#preloader").hide();
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data[2],
      datasets: [
        {
          data: data[0],
          label: "Infected",
          borderColor: "#3333ff",
          fill: true,
        },
        {
          data: data[1],
          label: "Deaths",
          borderColor: "red",
          backgroundColor: "rgba(255,0,0,0.5)",
          fill: true,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
};
