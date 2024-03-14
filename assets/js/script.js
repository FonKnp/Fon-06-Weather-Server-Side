let searchBt = document.getElementById('search-button');
let searchInput = document.getElementById('search-input');
let cityInput = JSON.parse(localStorage.getItem('cityName'));

let apiKey = '6054fcd953d7cd19d0770921f98b21c1';
let weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&appid=' + apiKey;
let forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityInput + '&appid=' + apiKey;

function getweatherUrl () {
  
  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      console.log(data.main);
      console.log(data.main.temp);
      console.log(data.wind.speed);
      console.log(data.main.humidity);
    })
    .catch(function (error) {
      console.log('ERROR');
    })
}

searchBt.addEventListener('click', function(event) {
  // event.preventDefault();
  addInputValue();
  getweatherUrl(cityInput);
  searchInput.value = '';
});


// add city key and value to local storage
function addInputValue () {
  let cityName = searchInput.value;
  
  localStorage.setItem('cityName', JSON.stringify(cityName));

}




// get data from search history in local storage
function getSearchHistory () {

}
getweatherUrl();