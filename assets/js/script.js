let searchBt = document.getElementById('search-button');
let searchInput = document.getElementById('search-input');
let searchHistory = document.getElementById('search-history');
let cityCard = document.getElementById('citycard');
let cityName = document.getElementById('city-name');
let currentIcon = document.getElementById('current-pic');
let currentTemp = document.getElementById('temp');
let currentWind = document.getElementById('wind');
let currentHumid = document.getElementById('humidity');
let card1 = document.getElementById('card1');
let card2 = document.getElementById('card2');
let card3 = document.getElementById('card3');
let card4 = document.getElementById('card4');
let card5 = document.getElementById('card5');

let cityInput = JSON.parse(localStorage.getItem('city'));

let apiKey = '6054fcd953d7cd19d0770921f98b21c1';
let weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&appid=' + apiKey;
let forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityInput + '&appid=' + apiKey;

function getweatherUrl () {
  
  fetch(weatherUrl)
    .then(function (response) {
      if (response.ok) {
        response.json()
        .then(function(data) {
          console.log(data);
          console.log(data.main);
          console.log(data.main.temp);
          console.log(data.wind.speed);
          console.log(data.main.humidity);
          displayWeather(data);
        })
      } else {
        console.log('Error, not a city name');
      }
    })
    .catch(function (error) {
      console.log('ERROR Unablr to connect');
    })
}

searchBt.addEventListener('click', function() {
  // event.preventDefault();
  addInputValue();
  getweatherUrl(cityInput);
  searchInput.value = '';
});


// add city key and value to local storage
function addInputValue () {
  let cityName = searchInput.value;
  
  localStorage.setItem('city', JSON.stringify(cityName));

}


function displayWeather(info) {
  if (info.length === 0) {
    cityCard.textContent = 'Weather information not found!';
  } else {
    cityName.innerHTML = info.name;
    currentIcon.src = 'https://openweathermap.org/img/wn/' + info.weather[0].icon +'@2x.png';
    currentTemp.textContent = 'Temp: ' + ((info.main.temp-273) * (9/5) + 32).toFixed(2) + ' ºF';
    currentWind.textContent = 'Wind: ' + info.wind.speed + ' MPH';
    currentHumid.textContent = 'Humidity: ' + info.main.humidity + ' %'
  }
}

// get data from search history in local storage
function getSearchHistory () {

}

getweatherUrl();

