const url = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "c88ff1b809e5815209f20ab2adfe2d04";

$(document).ready(function () {
  weatherFn("Indore"); // Set Noida as the initial city
});

async function weatherFn(cName) {
  const temp = `${url}?q=${cName}&appid=${apiKey}&units=metric`;
  try {
    const res = await fetch(temp);
    const data = await res.json();
    if (res.ok) {
      weatherShowFn(data);
    } else {
      alert("City not found. Please try again.");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function weatherShowFn(data) {
  $("#city-name").text(data.name);
  $("#date").text(moment().format("MMMM Do YYYY, h:mm:ss a")); // Corrected date format to include year
  $("#temperature").html(`${Math.round(data.main.temp)}°C`); // Rounded temperature
  $("#description").text(data.weather[0].description);
  $("#wind-speed").html(`Wind Speed: ${data.wind.speed} m/s`);
  $("#weather-icon").attr(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  ); // Corrected icon URL
  $("#weather-info").fadeIn();
}
