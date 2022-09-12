import { apiKey } from "./config.js";

// const form = document.querySelector(".top-banner form");
const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const msg = document.getElementById("msg");
const city = document.getElementById("city");
const wind = document.getElementById("wind");
const description = document.getElementById("description");
const temp = document.getElementById("temp");

function convertion(val) {
  return (val - 273).toFixed(2);
}

form.addEventListener("submit", searchWeather);

async function searchWeather(event) {
  event.preventDefault();
  const inputVal = cityInput.value;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();

      var nameval = data["name"];
      var descrip = data["weather"]["0"]["description"];
      var tempature = data["main"]["temp"];
      var wndspd = data["wind"]["speed"];
      const icon = `https://openweathermap.org/img/wn/${data["weather"]["0"]["icon"]}@2x.png`;
      city.innerHTML = `Weather of <span>${nameval}<span>`;
      temp.innerHTML = `Temperature: <span>${tempature} <sup>°</sup>C</span>`;
      description.innerHTML = `Sky Conditions: <span>${descrip}<span>`;
      wind.innerHTML = `Wind Speed: <span>${wndspd} km/h<span>`;
      document.querySelector(".img-weather").setAttribute("src", icon);
    } else {
      msg.textContent = "Please search for a valid city";
    }
  } catch (err) {
    msg.textContent = "Please search for a valid city";
    console.error(err);
  }
}
