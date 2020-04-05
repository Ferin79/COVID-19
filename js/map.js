$(document).ready(function () {
  $(".sidenav").sidenav();
  $(".tooltipped").tooltip();
  fetchTableData();
  handleHoverMap();
  $("#email").keyup(handleSearch);
  $(".floating-wrapper").click(() => {
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });
});

const fetchTableData = async () => {
  const response = await fetch("https://corona.lmao.ninja/countries");
  const responseData = await response.json();
  console.log(responseData);
  $("#data-entry-table").empty();
  responseData.forEach((data) => {
    var html = `
    <tr>
      <td><img src='${data.countryInfo.flag}' height='50' width='50'/></td>
      <td>${data.country}</td>
      <td>${data.cases}</td>
      <td>${data.deaths}</td>
      <td>${data.recovered}</td>
      <td>${data.active}</td>
      <td>${data.critical}</td>
    </tr>`;
    $("#data-entry-table").append(html);
    html = "";
  });
};
const handleSearch = () => {
  var value = $("#email").val().toLowerCase().trim();
  $("table tr").each(function (index) {
    if (!index) return;
    $(this)
      .find("td")
      .each(function () {
        var id = $(this).text().toLowerCase().trim();
        var not_found = id.indexOf(value) == -1;
        $(this).closest("tr").toggle(!not_found);
        return not_found;
      });
  });
};

const handleHoverMap = () => {
  $description = $(".description");

  $(".country-area").hover(
    async function () {
      $description.html("");
      $(this).attr("class", "enabled heyo");
      $description.addClass("active");
      const response = await fetch(
        `https://corona.lmao.ninja/countries/${$(this).attr("id")}`
      );
      const responseData = await response.json();
      console.log(responseData);
      var html = `
        <h6>${$(this).attr("id")}</h6>
        <p>Total Cases: <span>${responseData.cases}</span></p>
        <p>Total Deaths: <span>${responseData.deaths}</span></p>
      `;
      $description.append(html);
    },
    function () {
      $description.removeClass("active");
    }
  );

  $(document).on("mousemove", function (e) {
    $description.css({
      left: e.pageX,
      top: e.pageY - 70,
    });
  });
};
