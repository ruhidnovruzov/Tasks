const infoDiv = document.getElementById("info");
const searchHistoryDiv = document.getElementById("searchHistory");
let searchHistory = [];

const storedSearchHistory = localStorage.getItem("searchHistory");
if (storedSearchHistory) {
  searchHistory = JSON.parse(storedSearchHistory);
  displaySearchHistory();
}


async function getWeather(city) {
  const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "eb5e6b1286msh0f1e6b2306fb8c3p1555b7jsn561eb9277403",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function displayWeather(weatherData) {
  if (!weatherData) {
    infoDiv.innerHTML = `
      <span>No weather data available</span>
    `;
    return;
  }
  const { current, location } = weatherData;
  infoDiv.innerHTML = `
    <div class="location_date">
      <h2>${location.name}, ${location.country}</h2>
      <p class="date">${location.localtime}</p>
    </div>
    <h3>${current.temp_c}°C</h3>
    <div id = "condition">
    <p class="condition">${current.condition.text}</p>
    </div>
  `
  if(current.condition.text == "Sunny"){
    const conditionImg = document.getElementById("condition")
    const img = document.createElement("img")
    img.src  = "assets/sun.png"
    conditionImg.appendChild(img)
  }
  else if (current.condition.text == "Light rain" || current.condition.text == "Light rain shower" || current.condition.text == "Patchy rain nearby"){
    const conditionImg = document.getElementById("condition")
    const img = document.createElement("img")
    img.src  = "assets/light-rain.png"
    conditionImg.appendChild(img)
  }
  else if(current.condition.text == "Partly cloudy"){
    const conditionImg = document.getElementById("condition")
    const img = document.createElement("img")
    img.src  = "assets/clouds.png"
    conditionImg.appendChild(img)
  }
  else if(current.condition.text == "Snowy"){
    const conditionImg = document.getElementById("condition")
    const img = document.createElement("img")
    img.src  = "assets/snow.png"
    conditionImg.appendChild(img)
  }
  else{
    const conditionImg = document.getElementById("condition")
    const img = document.createElement("img")
    img.src  = ""
    conditionImg.appendChild(img)
  }

  ;



  addToSearchHistory(location.name, current.temp_c);
}

function addToSearchHistory(city, temperature) {
  searchHistory.unshift({ city, temperature });
  if (searchHistory.length > 5) {
    searchHistory.pop();
  }
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  displaySearchHistory();
}

function displaySearchHistory() {
  searchHistoryDiv.innerHTML = "<h4>Search History:</h4>";
  searchHistory.forEach((search, index) => {
    const { city, temperature } = search;
    const searchItem = document.createElement("div");
    searchItem.classList.add("search-item");
    searchItem.innerHTML = `
      <p class="history_city">${index + 1}. ${city}</p>
      <p class="history_temp">${temperature}°C</p>
    `;
    searchHistoryDiv.appendChild(searchItem);
  });
}

async function handleButtonClick() {
  const cityInput = document.getElementById("city");
  const city = cityInput.value.trim();
  if (!city) {
    console.error("City name is required");
    return;
  }
  const weatherData = await getWeather(city);
  displayWeather(weatherData);
  cityInput.value = "";
}

const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", handleButtonClick);
