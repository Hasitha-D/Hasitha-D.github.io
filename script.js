const apiKey = "d9d8731021a049a80c92caaa1002769b"; // Replace with your actual API key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");
const city = "London"; // or use input from user

// Fetch data from OpenWeatherMap API
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
  .then(response => response.json())
  .then(data => {
    console.log(data); // Check the data in the console to see the structure
    // Extract the necessary information
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description;
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    // Now you can update the UI with the weather data
    document.querySelector("#temperature").innerText = `${temperature}°C`;
    document.querySelector("#weatherDescription").innerText = weatherDescription;
    document.querySelector("#weatherIcon").src = icon;
    // Change background based on weather
    changeBackground(weatherDescription);
  })
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
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); // Debugging: Check the response

        if (data.cod === 200) {
            displayWeather(data);
        } else {
            weatherInfo.innerHTML = `<p>${data.message}</p>`;
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        weatherInfo.innerHTML = `<p>Failed to fetch weather data.</p>`;
    }
}


function displayWeather(data) {
    const { name, main, weather } = data;
    const weatherInfo = document.getElementById('weatherInfo'); // Assuming you have this container

    // Choose the icon based on weather condition
    let weatherIcon = '';
    if (weather[0].description.toLowerCase().includes('rain')) {
        weatherIcon = 'rainy';  // You can replace this with actual icons or gifs
    } else {
        weatherIcon = 'sunny';  // You can replace this with actual icons or gifs
    }

    // Update UI
    document.querySelector("#cityName").innerText = name;
    document.querySelector("#temperature").innerText = `${main.temp} °C`;
    document.querySelector("#weatherDescription").innerText = weather[0].description;
    document.querySelector("#weatherIcon").src = `https://openweathermap.org/img/wn/${weather[0].icon}.png`;
    weatherInfo.classList.add('show');
}

function changeBackground(description) {
    if (description.includes("rain")) {
        document.body.classList.add("rainy");
        document.body.classList.remove("sunny");
    } else {
        document.body.classList.add("sunny");
        document.body.classList.remove("rainy");
    }
}

