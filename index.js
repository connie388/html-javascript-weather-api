// the apiKey is stored in config.js, and that file will not check in to the github
// to run this program, first create an account in openweathermap.org, choose the api
// and generate a key, then create a file called config.js with following codes:
//
// const apiKey = "put the key here";
// export { apiKey };
import { apiKey } from "./config.js";

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

// clear any previous weather data in container when search city not found
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

// call openweathermap.org for input city weather
async function searchWeather(event) {
  // call preventDefault to avoid refresh the screen and clear up all data returned
  // from server
  event.preventDefault();

  // get user input. valid input (city, country) e.g. 1) London, GB 2) Markham,
  // 3) London, CA
  const inputVal = cityInput.value;

  // Assume that only one record per input city, so set limit=1 in the fetch url
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&limit=1&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);

    // if fetch success, retrieve json data based on the format as the sample-data.txt
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

      msg.innerHTML = "Last Updated: " + new Date().toLocaleString();
      weatherDetail.textContent = "Weather Detail:";
      city.innerHTML = `${nameval} Weather`;
      temp.innerHTML = `Temperature: <span>${tempature} <sup>°</sup>C</span>`;
      description.innerHTML = `Sky Conditions: <span>${descrip}<span>`;
      wind.innerHTML = `Wind Speed: <span>${wndspd} km/h<span>`;
      tempMin.innerHTML = `Min temperature: <span>${minTemp} <sup>°</sup>C</span>`;
      tempMax.innerHTML = `Max temperature: <span>${maxTemp} <sup>°</sup>C</span>`;
      feelsLike.innerHTML = `<span>feels like ${feels}</span>`;
      humidity.innerHTML = `Humidity: <span>${humid}%</span>`;
      // animated icon from https://bas.dev/work/meteocons
      icon.innerHTML = `<img src="/animated-icon/${data["weather"]["0"]["icon"]}.svg" style= 'height:10rem'/>`;
      // icon.innerHTML = `<img src="/static-icon/${data["weather"]["0"]["icon"]}.png" style= 'height:10rem'/>`;
      // images from openweathermap.org also work
      // refer https://openweathermap.org/weather-conditions for file name and icon image
      // icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data["weather"]["0"]["icon"]}@2x.png" style= 'height:10rem'/>`;
    } else {
      msg.textContent = "Please search for a valid city";
      resetForm();
    }
  } catch (err) {
    // if user input an invalid city name, so status 404 record not found returned from
    // weather server
    msg.textContent = "Please search for a valid city";
    resetForm();
    console.error(err);
  }
}
