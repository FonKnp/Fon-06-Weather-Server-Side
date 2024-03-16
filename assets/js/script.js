
let searchBt = document.getElementById('search-button');
let searchInput = document.getElementById('search-input');
let searchHistory = document.getElementById('search-history');
let cityCard = document.getElementById('citycard');
let forecastBox = document.getElementById('forecast-box');
let forecastCard = document.querySelectorAll('.forecast-card');
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

let cityInput = JSON.parse(localStorage.getItem('city')) || [];

let apiKey = '6054fcd953d7cd19d0770921f98b21c1';
let today = dayjs();

// console.log(dayjs(today.add(1,'day')).format('MM/DD/YYYY'));
// add one day
// today.add(1,'day').format('MM/DD/YYYY')

function getweatherUrl (city) {
  let weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey;
  
  fetch(weatherUrl)
  .then(function (response) {
    if (response.ok) {
      response.json()
      .then(function(data) {
        console.log(data);
        console.log(data.list);
        // console.log(data.list[0].main);
        // console.log(data.list[0].main.temp);
        displayWeather(data);
        displayForecast(data);
      })
    } else {
      console.log('Error, not a city name');
    };
  })
  .catch(function (error) {
    console.log('ERROR Unable to connect');
  });
};



function displayWeather(info) {
  if (info.length === 0) {
    cityCard.textContent = 'Weather information not found!';
  } else {
    cityName.innerHTML = info.city.name + ' ' + today.format('MM/DD/YYYY');
    currentIcon.src = 'https://openweathermap.org/img/wn/' + info.list[0].weather[0].icon +'@2x.png';
    currentTemp.textContent = 'Temp: ' + ((info.list[0].main.temp-273) * (9/5) + 32).toFixed(2) + ' ºF';
    currentWind.textContent = 'Wind: ' + info.list[0].wind.speed + ' MPH';
    currentHumid.textContent = 'Humidity: ' + info.list[0].main.humidity + ' %';
    
  };
};

function displayForecast(info) {
  if (info.length === 0) {
    cityCard.textContent = 'Weather information not found!';
  } else {
    for (let i = 0; i < forecastCard.length; i++) {
      forecastCard[i].innerHTML = '';
      let cardIndex = (i * 8) + 4;
      let cardTitle = document.createElement('h6');
      let cardIcon = document.createElement('img');
      let cardTemp = document.createElement('p');
      let cardWind = document.createElement('p');
      let cardHumid = document.createElement('p');
      let forecastTemp = ((info.list[cardIndex].main.temp - 273) * 9/5 + 32);
      
      cardTitle.textContent = today.add(i+1,'day').format('MM/DD/YYYY');
      cardIcon.classList.add('mx-auto');
      cardIcon.src = 'https://openweathermap.org/img/wn/' + info.list[cardIndex].weather[0].icon +'@2x.png';
      cardTemp.textContent = 'Temp: ' + forecastTemp.toFixed(2) + ' ºF';
      cardWind.textContent = 'Wind: ' + info.list[cardIndex].wind.speed.toFixed(2) + ' MPH';
      cardHumid.textContent = 'Humidity: ' + info.list[cardIndex].main.humidity + ' %';
      

      forecastCard[i].append(cardTitle);
      forecastCard[i].append(cardIcon);
      forecastCard[i].append(cardTemp);
      forecastCard[i].append(cardWind);
      forecastCard[i].append(cardHumid);
    }
  };
};

// get data from search history in local storage
function getSearchHistory () {

  searchHistory.textContent = '';
    for ( let i = 0; i < cityInput.length; i++) {
      let cityHistory = document.createElement('button');
      cityHistory.classList.add('btn', 'btn-info', 'mb-3');
      cityHistory.setAttribute('value', cityInput[i]);
      cityHistory.textContent = cityInput[i];
      searchHistory.appendChild(cityHistory);

      cityHistory.addEventListener('click', function(event) {
        event.preventDefault();
        getweatherUrl(cityHistory.value);
        cityCard.classList.remove('hide');
        forecastBox.classList.remove('hide');
    })
  };
};
      
      
searchBt.addEventListener('click', function(event) {
  event.preventDefault();
  let cityEl = searchInput.value;
  getweatherUrl(cityEl);
  cityInput.push(cityEl);
  localStorage.setItem('city', JSON.stringify(cityInput));
  searchInput.value = '';
  getSearchHistory();
  cityCard.classList.remove('hide');
  forecastBox.classList.remove('hide');
});

getSearchHistory();
cityCard.classList.add('hide');
forecastBox.classList.add('hide');