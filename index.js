import { apiKey } from "./config.js";

// const form = document.querySelector(".top-banner form");
const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const msg = document.getElementById("msg");
const city = document.getElementById("city");
const wind = document.getElementById("wind");
const tempMax = document.getElementById("temp-max");
const tempMin = document.getElementById("temp-min");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const description = document.getElementById("description");
const icon = document.getElementById("icon");
const temp = document.getElementById("temp");
const weatherDetail = document.getElementById("weather-detail");

form.addEventListener("submit", searchWeather);

function resetForm() {
  weatherDetail.textContent = "";
  icon.innerHTML = "";
  feelsLike.innerHTML = "";
  humidity.innerHTML = "";
  city.innerHTML = "";
  temp.innerHTML = "";
  description.innerHTML = "";
  wind.innerHTML = "";
  tempMin.innerHTML = "";
  tempMax.innerHTML = "";
}

async function searchWeather(event) {
  event.preventDefault();
  const inputVal = cityInput.value;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();

      // following way to find data also work
      // var nameval = data["name"] + "," + data["sys"]["country"];
      var nameval = data.name + "," + data.sys.country;
      var descrip = data.weather["0"].description;
      var tempature = data.main.temp;
      var wndspd = data.wind.speed;
      var humid = data.main.humidity;
      var minTemp = data.main.temp_min;
      var maxTemp = data.main.temp_max;
      var feels = data.main.feels_like;

      msg.innerHTML = "&nbsp;";
      weatherDetail.textContent = "Weather Detail:";
      icon.innerHTML = `<img src="/animated-icon/${data["weather"]["0"]["icon"]}.svg" style= 'height:10rem'/>`;
      feelsLike.innerHTML = `<span>feels like ${feels}</span>`;
      humidity.innerHTML = `Humidity: <span>${humid}%</span>`;
      city.innerHTML = `${nameval} Weather`;
      temp.innerHTML = `Temperature: <span>${tempature} <sup>°</sup>C</span>`;
      description.innerHTML = `Sky Conditions: <span>${descrip}<span>`;
      wind.innerHTML = `Wind Speed: <span>${wndspd} km/h<span>`;
      tempMin.innerHTML = `Min temperature: <span>${minTemp} <sup>°</sup>C</span>`;
      tempMax.innerHTML = `Max temperature: <span>${maxTemp} <sup>°</sup>C</span>`;
      // icon.innerHTML = `<img src="/static-icon/${data["weather"]["0"]["icon"]}.png" style= 'height:10rem'/>`;
      // images from openweathermap.org also work
      // icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data["weather"]["0"]["icon"]}@2x.png" style= 'height:10rem'/>`;
    } else {
      msg.textContent = "Please search for a valid city";
      resetForm();
    }
  } catch (err) {
    msg.textContent = "Please search for a valid city";
    resetForm();
    console.error(err);
  }
}
