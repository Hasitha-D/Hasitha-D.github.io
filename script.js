const apiKey = "223df27a431d6abdfbd29f9de6a27dc1"; // Replace with your actual API key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");
const city = "London"; // or use input from user

// Fetch data from OpenWeatherMap API
fetch("https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric")
  .then(response => response.json())
  .then(data => {
    console.log(data); // Check the data in the console to see the structure
    // Extract the necessary information
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description;
    const icon = ("https://openweathermap.org/img/wn/${data.weather[0].icon}.png");

    // Now you can update the UI with the weather data
    document.querySelector("#temperature").innerText = ${temperature}°C;
    document.querySelector("#weatherDescription").innerText = weatherDescription;
    document.querySelector("#weatherIcon").src = icon;
    // Change background based on weather
    changeBackground(weatherDescription);
  
  .catch(error => {
    console.error("Error fetching weather data:", error);
  });

searchBtn.addEventListener("click", () => {
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

async function getWeather(city) {
    const url = ("https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}");

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); // Debugging: Check the response

        if (data.cod === 200) {
            displayWeather(data);
        } else {
            weatherInfo.innerHTML = <p>${data.message}</p>;
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        weatherInfo.innerHTML = <p>Failed to fetch weather data.</p>;
    }
}


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
    weatherInfo.innerHTML = 
        <h2>${name}</h2>
        <p><strong>Temperature:</strong> <span class="bold-text">${main.temp}°C</span> ${weatherIcon}</p>
        <p><strong>Weather:</strong> <span class="bold-text">${weather[0].description}</span> ${weatherIcon}</p>
    ;
}


fetch("https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric)")
  .then(response => response.json())
  .then(data => {
    if (data.cod === "404") {
      document.querySelector("#error-message").innerText = "City not found. Please check the name.";
    } else {
      // update UI with the weather data
    }
  })
  .catch(error => {
    document.querySelector("#error-message").innerText = "Error fetching weather data. Please try again.";
  });

document.querySelector("#loading-spinner").style.display = "block";

// After data is fetched
document.querySelector("#loading-spinner").style.display = "none";

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
