
document.getElementById("getWeatherBtn").addEventListener("click", getWeather);

function getWeather() {
    const city = document.getElementById("cityInput").value;
    const apiKey = "cee4bd34bf49b74acfb5fdebc03a347a";
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
