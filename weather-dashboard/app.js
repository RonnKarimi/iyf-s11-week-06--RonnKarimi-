const apiKey = "e08aff6b0eb81bc3969748bced0cea61";

const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");

const loading = document.getElementById("loading");
const error = document.getElementById("error");

const weatherDisplay = document.getElementById("weather-display");

const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");

const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");

const searchHistory = document.getElementById("search-history");

let recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];

searchForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const city = cityInput.value.trim();

    if (city !== "") {
        getWeather(city);
    }

});

async function getWeather(city) {

    showLoading();

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found.");
        }

        const data = await response.json();

        displayWeather(data);

        saveSearch(city);

    } catch (err) {

        showError(err.message);

    } finally {

        hideLoading();

    }

}

function displayWeather(data) {

    weatherDisplay.classList.remove("hidden");
    error.classList.add("hidden");

    cityName.textContent =
        `${data.name}, ${data.sys.country}`;

    temperature.textContent =
        `${Math.round(data.main.temp)}°C`;

    description.textContent =
        data.weather[0].description;

    feelsLike.textContent =
        `${Math.round(data.main.feels_like)}°C`;

    humidity.textContent =
        `${data.main.humidity}%`;

    wind.textContent =
        `${data.wind.speed} m/s`;

    pressure.textContent =
        `${data.main.pressure} hPa`;

    weatherIcon.src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherIcon.alt =
        data.weather[0].description;

}

function showLoading() {

    loading.classList.remove("hidden");

    weatherDisplay.classList.add("hidden");

    error.classList.add("hidden");

}

function hideLoading() {

    loading.classList.add("hidden");

}

function showError(message) {

    weatherDisplay.classList.add("hidden");

    error.classList.remove("hidden");

    error.textContent = message;

}

function saveSearch(city) {

    const formattedCity =
        city.charAt(0).toUpperCase() +
        city.slice(1).toLowerCase();

    recentSearches = recentSearches.filter(
        item => item.toLowerCase() !== formattedCity.toLowerCase()
    );

    recentSearches.unshift(formattedCity);

    if (recentSearches.length > 5) {
        recentSearches.pop();
    }

    localStorage.setItem(
        "recentSearches",
        JSON.stringify(recentSearches)
    );

    displaySearchHistory();

}

function displaySearchHistory() {

    searchHistory.innerHTML = "";

    recentSearches.forEach(city => {

        const li = document.createElement("li");

        li.textContent = city;

        li.addEventListener("click", () => {

            cityInput.value = city;

            getWeather(city);

        });

        searchHistory.appendChild(li);

    });

}

displaySearchHistory();

if (recentSearches.length > 0) {

    getWeather(recentSearches[0]);

}
