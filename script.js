document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("getWeatherBtn").addEventListener("click", getWeather);
});


function getWeather() {
    const city = document.getElementById("cityInput").value;
    const apiKey = "d9d8731021a049a80c92caaa1002769b";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const temp = data.main.temp;
            const description = data.weather[0].description;
            document.getElementById("weatherInfo").innerHTML = `
                <h2>${city}</h2>
                <p>${temp}°C - ${description}</p>
            `;
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById("weatherInfo").innerHTML = `<p>Error fetching data</p>`;
        });
}
fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Weather data not available. Check city name or API key.");
    }
    return response.json();
  })
  .then((data) => {
    const temp = data.main.temp;
    const description = data.weather[0].description;
    // etc...
  })
  .catch((error) => {
    console.error("Error:", error);
    alert("Failed to fetch weather. Try a different city or fix your API key.");
  });














const themeToggleBtn = document.getElementById('themeToggle');

themeToggleBtn.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light-theme');

  // Switch icon based on theme
  if (isLight) {
    themeToggleBtn.textContent = '☀️';  // Sun icon for light theme
    themeToggleBtn.style.color = '#222'; // Dark icon color on light background
  } else {
    themeToggleBtn.textContent = '🌙';  // Moon icon for dark theme
    themeToggleBtn.style.color = 'white'; // Light icon color on dark background
  }
});


