const apiKey = "d9d8731021a049a80c92caaa1002769b"; // Replace with your actual API key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");
const forecastInfo = document.getElementById("forecast-info"); // 5-day forecast container

// Fetch data from OpenWeatherMap API for current weather
fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`)
  .then(response => response.json())
  .then(data => {
    console.log(data); // Check the data structure
    displayWeather(data); // Display current weather
  })
  .catch(error => {
    console.error("Error fetching weather data:", error);
  });

// Search button click event
searchBtn.addEventListener("click", () => {
  const city = cityInput.value;
  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});

// Function to get weather data
async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data); // Debugging: Check the response

    if (data.cod === 200) {
      displayWeather(data); // Display current weather
      getForecast(city); // Get the 5-day forecast
    } else {
      weatherInfo.innerHTML = `<p>${data.message}</p>`;
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    weatherInfo.innerHTML = `<p>Failed to fetch weather data.</p>`;
  }
}

// Function to display current weather
function displayWeather(data) {
  const { name, main, weather } = data;
  const weatherInfo = document.getElementById('weatherInfo'); // Assuming you have this container

  // Choose the icon based on weather condition
  let weatherIcon = '';
  if (weather[0].description.toLowerCase().includes('rain')) {
    weatherIcon = '<i class="fas fa-cloud-showers-heavy"></i>';  // Rain icon
  } else if (weather[0].description.toLowerCase().includes('sun')) {
    weatherIcon = '<i class="fas fa-sun"></i>';  // Sun icon
  } else {
    weatherIcon = '<i class="fas fa-cloud"></i>';  // Default Cloud icon
  }

  // Set HTML content with icons and bold text
  weatherInfo.innerHTML = `
    <h2>${name}</h2>
    <p><strong>Temperature:</strong> <span class="bold-text">${main.temp}°C</span> ${weatherIcon}</p>
    <p><strong>Weather:</strong> <span class="bold-text">${weather[0].description}</span> ${weatherIcon}</p>
  `;

  // Change background based on weather
  changeBackground(weather[0].description);
}

// Fetch 5-day forecast
async function getForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data); // Debugging: Check the response

    if (data.cod === "200") {
      displayForecast(data); // Display 5-day forecast
    }
  } catch (error) {
    console.error("Error fetching forecast data:", error);
  }
}

// Function to display the 5-day forecast
function displayForecast(data) {
  const forecastInfo = document.getElementById("forecast-info");
  forecastInfo.innerHTML = ""; // Clear previous forecast data

  // Loop through the 5-day forecast data (every 3 hours)
  for (let i = 0; i < data.list.length; i += 8) {  // Taking one data point per day (8 * 3 hours)
    const { dt, main, weather } = data.list[i];
    const date = new Date(dt * 1000).toLocaleDateString(); // Convert Unix timestamp to readable date
    const weatherIcon = `https://openweathermap.org/img/wn/${weather[0].icon}.png`; // Get the weather icon

    // Create the HTML for each day
    const forecastDay = document.createElement("div");
    forecastDay.classList.add("forecast-day");
    forecastDay.innerHTML = `
      <h3>${date}</h3>
      <img src="${weatherIcon}" alt="${weather[0].description}">
      <p><strong>Temp:</strong> ${main.temp}°C</p>
      <p>${weather[0].description}</p>
    `;

    forecastInfo.appendChild(forecastDay);
  }
}

// Change background based on weather description
function changeBackground(weather) {
  const body = document.body;

  if (weather.includes('rain')) {
    body.classList.remove('sunny');
    body.classList.add('rainy');
  } else if (weather.includes('clear') || weather.includes('clear sky')) {
    body.classList.remove('rainy');
    body.classList.add('sunny');
  } else {
    body.classList.remove('rainy', 'sunny');
  }
}
