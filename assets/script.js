var cityInput = document.getElementById('city-input');
// function input() {
//     console.log(cityInput.value);
// }
var searchBtn = document.getElementById('search-button');
var text = document.querySelector('#test');
var userLocation = document.querySelector('#user-location-city');
var userLocationWeather = document.querySelector('#user-location-weather');
// var userLocationIcon = document.querySelector('#user-location-icon');

pageLoad()
function pageLoad() {
const successCallback = (position) => {
    console.log(position);
    var userLat = position.coords.latitude;
    var userLon = position.coords.longitude;
    console.log(userLon);
    console.log(userLat);
    getUserLocation(userLat,userLon);
  };
  const errorCallback = (error) => {
    console.log(error);
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


          userLocation.textContent = userLocationCity;
          document.querySelector('#current-day').textContent = userLocationDate;
          document.querySelector('#user-location-icon').src = iconURL;
          document.getElementById('user-location-icon').height = "50";
          document.getElementById('user-location-icon').width = "50";
          userLocationWeather.textContent = userLocationTemp + " | " + userLocationDescription + " | " + userLocationWind + " | " + userLocationHumidity;          
          
        
        //   var currentCard=document.createElement('div');
        //   var currentDate= document.createElement('p');
        //   currentDate.textContent=userLocationDate;
        //   currentCard.appendChild(currentDate);

        //   text.appendChild(currentCard);

        })      
    }
    
}

function getPoint() {
    fetch("http://api.openweathermap.org/geo/1.0/direct?q="+cityInput.value+"&limit=1&appid=5544851bf4ad5ff456c250c8b1a41d03")
    .then((response)=>response.json())
    .then((data)=> {
        console.log(data);
        var lat = data[0].lat;
        console.log(lat);
        var lon = data[0].lon;
        console.log(lon);
        getWeather(lat,lon);
    })
    
}

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
        placeIcon(addIcon)
    })

        userLocation.textContent = cityName;
        document.querySelector('#user-location-icon').src = currentIcon;
        document.getElementById('user-location-icon').height = "50";
        document.getElementById('user-location-icon').width = "50";
        userLocationWeather.textContent = temp + " | " + description + " | " + wind + " | " + humidity;
    })
}
function placeIcon(addIcon) {
    document.getElementById('icon').src = addIcon;
    document.getElementById('icon').height = "50";
    document.getElementById('icon').width = "50";
}

searchBtn.addEventListener('click', getPoint);