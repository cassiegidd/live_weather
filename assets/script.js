var cityInput = document.getElementById('city-input'); //search input
var searchBtn = document.getElementById('search-button'); 
var userLocation = document.querySelector('#user-location-city'); //appends and displays the city user is currently in 
var userLocationWeather = document.querySelector('#user-location-weather'); //appends and displays weather data of city user is currently in
var forecastDiv = document.querySelector('#forecast-div'); //div used to append and display the five day weather forecast

// this function gets the users longitude and latitude and then calls a function to get the weather data for that point
pageLoad()
function pageLoad() {
const successCallback = (position) => {
    var userLat = position.coords.latitude; //variable that contains the users current latitude
    var userLon = position.coords.longitude; //variable that contains the users current longitude
    getUserLocation(userLat,userLon); //calling function that will retrieve weather data for users current location
  };
  const errorCallback = (error) => {
  };
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

  function getUserLocation(userLat,userLon) {
      fetch("https://api.openweathermap.org/data/2.5/forecast?lat="+userLat+"&lon="+userLon+"&appid=5544851bf4ad5ff456c250c8b1a41d03&units=imperial")
      .then((response)=>response.json())
      .then((data)=> {
          console.log(data);
          var userLocationCity = data.city.name;
          console.log(userLocationCity);
          var userLocationDate = new Date(data.list[0].dt*1000);
          userLocationDate = userLocationDate.toLocaleString("en-us",{weekday:"long"});
          var userLocationDescription = data.list[0].weather[0].description;
          var userLocationTemp = Math.floor(data.list[0].main.temp)+ "°";
          var userLocationWind = Math.floor(data.list[0].wind.speed) + " mph winds";
          var userLocationHumidity = data.list[0].main.humidity + "% humidity";
          var userLocationIcon = data.list[0].weather[0].icon;
          var iconURL = "https://openweathermap.org/img/wn/"+userLocationIcon+"@2x.png";
          console.log(userLocationIcon);
          console.log(iconURL);

          userLocation.textContent = userLocationCity;
          document.querySelector('#current-day').textContent = userLocationDate;
          document.querySelector('#user-location-icon').src = iconURL;
          document.getElementById('user-location-icon').height = "50";
          document.getElementById('user-location-icon').width = "50";
          userLocationWeather.textContent = userLocationTemp + " | " + userLocationDescription + " | " + userLocationWind + " | " + userLocationHumidity;          
          
          for(var i=7; i<40; i+=8) { //loop to append data to webpage
          var cardForecast = document.createElement('div');
          forecastDiv.classList.add('bg-indigo-400');
          var dateForecast = document.createElement('p');
          dateForecast.textContent = new Date(data.list[i].dt*1000).toLocaleString("en-us", {weekday:"long"});
          dateForecast.classList.add('text-white');
          var iconForecast = document.createElement('img');
          iconForecast.height = "30";
          iconForecast.width = "30";
          iconForecast.src =  "https://openweathermap.org/img/wn/"+ data.list[i].weather[0].icon+"@2x.png";
          var tempForecast = document.createElement('p');
          tempForecast.textContent = Math.floor(data.list[i].main.temp)+ "°";
          var windForecast = document.createElement('p');
          windForecast.textContent = Math.floor(data.list[i].wind.speed) + " mph winds";
          var humidityForecast = document.createElement('p');
          humidityForecast.textContent = data.list[i].main.humidity + "% humidity";
          cardForecast.appendChild(dateForecast);
          cardForecast.appendChild(iconForecast);
          cardForecast.appendChild(tempForecast);
          cardForecast.appendChild(windForecast);
          cardForecast.appendChild(humidityForecast);
          forecastDiv.appendChild(cardForecast);
        }

        })      
    }
    
}

// this function gets the longitude and latitude the city that the user types into the search bar
function getPoint() {
   
    fetch("https://api.openweathermap.org/geo/1.0/direct?q="+cityInput.value+"&limit=1&appid=5544851bf4ad5ff456c250c8b1a41d03")
    .then((response)=>response.json())
    .then((data)=> {
        console.log(data);
        var lat = data[0].lat;
        console.log(lat);
        var lon = data[0].lon;
        console.log(lon);
        getWeather(lat,lon); //calling function to get the weather data for the longitude and latitude fetched from the "getPoint" function
        document.getElementById('city-input').value='';
    })
    
}
// this function will use the longitude and latitude data fetched from the "getPoint" function to retrieve and display weather data
function getWeather(latinput,loninput) {
    console.log(latinput);
    fetch("https://api.openweathermap.org/data/2.5/forecast?lat="+latinput+"&lon="+loninput+"&appid=5544851bf4ad5ff456c250c8b1a41d03&units=imperial")
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data);
        var cityName = data.city.name;
        console.log(cityName);
        var date = new Date(data.list[0].dt*1000);
        date = date.toLocaleString('en-us', {weekday:"long"});
        console.log(date);
        var description = data.list[0].weather[0].description;
        console.log(description);
        var temp = Math.floor(data.list[0].main.temp)+ "°";
        console.log(temp);
        var wind = Math.floor(data.list[0].wind.speed*2.237)+ " mph winds";
        console.log(wind*2.237); //converting meters per second to miles per hour
        var humidity = data.list[0].main.humidity+ "% humidity";
        console.log(humidity);
        var icon = data.list[0].weather[0].icon;
        var currentIcon = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
        console.log(icon);
    fetch("https://openweathermap.org/img/wn/"+icon+"@2x.png")
    .then((response)=>response)
    .then((data)=>{
        console.log(data);
        var addIcon = data.url;  
        console.log(addIcon);
    })

        userLocation.textContent = cityName;
        document.querySelector('#user-location-icon').src = currentIcon;
        document.getElementById('user-location-icon').height = "50";
        document.getElementById('user-location-icon').width = "50";
        userLocationWeather.textContent = temp + " | " + description + " | " + wind + " | " + humidity;

        document.getElementById('forecast-div').innerHTML = "";

        for(var i=7; i<40; i+=8) { //loop to display weather data to webpage
            var cardForecast = document.createElement('div');
            forecastDiv.classList.add('bg-indigo-100');
            var dateForecast = document.createElement('p');
            dateForecast.textContent = new Date(data.list[i].dt*1000).toLocaleString("en-us", {weekday:"long"});
            dateForecast.classList.add('text-white');
            var iconForecast = document.createElement('img');
            iconForecast.height = "30";
            iconForecast.width = "30";
            iconForecast.src =  "https://openweathermap.org/img/wn/"+ data.list[i].weather[0].icon+"@2x.png";
            var tempForecast = document.createElement('p');
            tempForecast.textContent = Math.floor(data.list[i].main.temp)+ "°";
            var windForecast = document.createElement('p');
            windForecast.textContent = Math.floor(data.list[i].wind.speed) + " mph winds";
            var humidityForecast = document.createElement('p');
            humidityForecast.textContent = data.list[i].main.humidity + "% humidity";
            cardForecast.appendChild(dateForecast);
            cardForecast.appendChild(iconForecast);
            cardForecast.appendChild(tempForecast);
            cardForecast.appendChild(windForecast);
            cardForecast.appendChild(humidityForecast);
            forecastDiv.appendChild(cardForecast);
    }
})
        // gathers and sets data for local storage
        var cityHistory = JSON.parse(localStorage.getItem("city-history")) || [];
        cityHistory.push(cityInput.value);
        localStorage.setItem("city-history",JSON.stringify(cityHistory));
        createSearchBtn(); //calling function to gather localstorage info and display it on a 'recent search' button 
        recentlySearched(); //calling function to retrieve and display weather data when button is clicked
        

}

function createSearchBtn() { //function to gather data from local storage and display it to a created button
    var cityHistory = JSON.parse(localStorage.getItem("city-history")) || [];
    document.getElementById('search-history').innerHTML = "";
    for (var i=0; i<cityHistory.length; i++) {
        var historyBtn = document.createElement('button');
        historyBtn.classList.add('history');
        historyBtn.innerText = cityHistory[i];
        historyBtn.setAttribute("value", cityHistory[i]);
        var searchHistory = document.getElementById('search-history');
        searchHistory.append(historyBtn);
    }

}
createSearchBtn()
recentlySearched ()

searchBtn.addEventListener('click', getPoint); //when user pushes the search button, initial weather fetch will begin

function recentlySearched() { // function to retrieve data when selected button is pressed
$('.history').on('click', function(event) {
    var buttonValue = $(this).val();
    console.log(buttonValue);
    fetch("https://api.openweathermap.org/geo/1.0/direct?q="+buttonValue+"&limit=1&appid=5544851bf4ad5ff456c250c8b1a41d03")
    .then((response)=>response.json())
    .then((data)=> {
        var lat = data[0].lat;
        var lon = data[0].lon;
        getWeather(lat,lon);
    }) 
})}