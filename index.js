import { apiKey } from "./config.js";

// const form = document.querySelector(".top-banner form");
const form = document.getElementById("weather-form");
const log = document.getElementById("city");
const cityInput = document.getElementById("city-input");
const msg = document.getElementById("msg");

form.addEventListener("submit", searchWeather);

async function searchWeather(event) {
  event.preventDefault();
  const inputVal = cityInput.value;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const result = await response.json();

      log.textContent = `Temperature: ${result.main.temp}`;
    } else {
      msg.textContent = "Please search for a valid city 😩";
    }
  } catch (err) {
    msg.textContent = "Please search for a valid city 😩";
    console.error(err);
  }
}
