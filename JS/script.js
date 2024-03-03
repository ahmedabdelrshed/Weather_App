let inputSearch = document.getElementById("inputSearch");
let btnSearch = document.getElementById("btn-search");
let weatherImg = document.querySelector(".weather-img");
let temp = document.getElementById("temp");
let city = document.getElementById("city");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let messageError = document.getElementById("messageError");

let weatherData;
let default_city = "Cairo";

async function getWeather() {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${default_city}&appid=b5ce9b03014df6d4e59c0ba06ee44d08&units=metric`;
  try {
    let response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    } else {
      messageError.style.display = "none";
      weatherData = await response.json();
      UpdateData();
    }
  } catch (error) {
    messageError.style.display = "block";
  }
}

getWeather();

btnSearch.addEventListener("click", () => {
  if (inputSearch.value.trim() != "") {
    default_city = inputSearch.value;
    getWeather();
    inputSearch.value = "";
  }
});

function UpdateData() {
  city.innerHTML = weatherData.name;
  temp.innerHTML = Math.round(weatherData.main.temp);
  humidity.innerHTML = Math.round(weatherData.main.humidity);
  wind.innerHTML = Math.round(weatherData.wind.speed);
  let status = weatherData.weather[0].main;
  switch (status) {
    case "Clear":
      weatherImg.src = "images/clear.png";
      break;
    case "Clouds":
      weatherImg.src = "images/clouds.png";
      break;
    case "Rain":
      weatherImg.src = "images/rain.png";
      break;
    case "Drizzle":
      weatherImg.src = "images/drizzle.png";
      break;
    case "Mist":
      weatherImg.src = "images/mist.png";
      break;
    case "Snow":
      weatherImg.src = "images/snow.png";
      break;
  }
}
