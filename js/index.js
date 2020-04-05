$(document).ready(function () {
  $(".sidenav").sidenav();
  fetchIndexDetails();
  setInterval(fetchIndexDetails, 1000 * 60);
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
  $(".active-cases").html(responseData.active);
  $(".critical-cases").html(responseData.critical);
  $(".casePerMillion").html(responseData.casesPerOneMillion);
  $(".deathPerMillion").html(responseData.deathsPerOneMillion);
  $(".todaycases").html(responseData.todayCases);
  $(".todayDeath").html(responseData.todayDeaths);
  $(".counter").counterUp({
    delay: 10,
    time: 1000,
  });
};
