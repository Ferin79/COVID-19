$(document).ready(function () {
  $(".sidenav").sidenav();
  fetchIndexDetails();
});

const fetchIndexDetails = async () => {
  const date = new Date();
  $(".last-update-date").html(date);
  const response = await fetch("https://corona.lmao.ninja/all");
  const responseData = await response.json();
  console.log(responseData);
  $(".total-cases").html(responseData.cases);
  $(".total-death").html(responseData.deaths);
  $(".total-recovered").html(responseData.recovered);
  $(".counter").counterUp({
    delay: 10,
    time: 1000,
  });
};
