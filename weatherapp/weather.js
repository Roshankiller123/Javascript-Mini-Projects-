// const url = "https://api.openweathermap.org/data/2.5/onecall?";
// const lat = "lat=18.5204&";
// const lon = "lon=73.8567&";
// const apiOptions = "units-metric&exclude=minutely,alerts&";
// const apikey = "appid=5c2ec91ebf2d5326b40c0ef21fbe6eb9";
// const file = url + lat + lon + apiOptions + apikey;

// fetch(file)
//   .then((Response) => {
//     return Response.json();
//   })
//   .then((data) => {
//     // Weather main data
//     let main = data.current.weather[0].main;
//     let description = data.current.weather[0].description;
//     let temp = Math.round(data.current.temp);
//     let pressure = data.current.pressure;
//     let humidity = data.current.humidity;
//     let name = "roshan";

//     document.getElementById("wrapper-description").innerHTML = description;
//     document.getElementById("wrapper-temp").innerHTML = temp + "&degC";
//     document.getElementById("wrapper-pressure").innerHTML = pressure;
//     document.getElementById("wrapper-humidity").innerHTML = humidity + "&degC";
//     document.getElementById("wrapper-name").innerHTML = name;

//     // Weather hourly data
//     let hourNow = data.hourly[0].temp;
//     let hour1 = data.hourly[1].temp;
//     let hour2 = data.hourly[2].temp;
//     let hour3 = data.hourly[3].temp;
//     let hour4 = data.hourly[4].temp;
//     let hour5 = data.hourly[5].temp;

//     document.getElementById("wrapper-hour-now").innerHTML = hourNow + "&deg";
//     document.getElementById("wrapper-hour1").innerHTML = hour1 + "&deg";
//     document.getElementById("wrapper-hour2").innerHTML = hour2 + "&deg";
//     document.getElementById("wrapper-hour3").innerHTML = hour3 + "&deg";
//     document.getElementById("wrapper-hour4").innerHTML = hour4 + "&deg";
//     document.getElementById("wrapper-hour5").innerHTML = hour5 + "&deg";

//     // Time
//     let timeNow = new Date().getHours();
//     let time1 = timeNow + 1;
//     let time2 = time1 + 1;
//     let time3 = time2 + 1;
//     let time4 = time3 + 1;
//     let time5 = time4 + 1;

//     document.getElementById("wrapper-time1").innerHTML = time1;
//     document.getElementById("wrapper-time2").innerHTML = time2;
//     document.getElementById("wrapper-time3").innerHTML = time3;
//     document.getElementById("wrapper-time4").innerHTML = time4;
//     document.getElementById("wrapper-time5").innerHTML = time5;

//     // Weather daily data
//     let tomorrowTemp = Math.round(data.daily[0].temp.day);
//     let DATTtemp = Math.round(data.daily[1].temp.day);
//     let tomorrowMain = data.daily[0].weather[0].main;
//     let DATTempMain = data.daily[1].weather[0].main;
//   });

// let city = document.getElementById("cityName");
// let temperatureDegree = document.getElementById("temperatureDegree");
// let temperatureIcon = document.getElementById("temperatureIcon");
// let Humidity = document.getElementById("Humidity");
// let Pressure = document.getElementById("Pressure");

// window.addEventListener("load", () => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition((position) => {
//       lat = position.coords.latitude;
//       long = position.coords.longitude;
//       console.log(lat);
//       console.log(long);
//       getData();
//     });
//   }
// });

// async function getData() {
//   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=5c2ec91ebf2d5326b40c0ef21fbe6eb9`;

//   const response = await fetch(url);
//   const data = await response.json();
//   console.log(data);

//   const name = data.name;
//   const temp = Math.round(data.main.temp - 273);
//   const tempIcon = data.weather[0].icon;
//   const humidity = data.main.humidity;
//   const pressure = data.main.pressure;

//   city.innerHTML = name;
//

let city = document.querySelector(".cityName");
let temperatureDegree = document.querySelector(".temperatureDegree");
let temperatureIcon = document.getElementById("temperatureIcon");
let Humidity = document.querySelector(".Humidity");
let Pressure = document.querySelector(".Pressure");

// Geolocation
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, setError);
} else {
  NotificationElement.style.display = "block";
  NotificationElement.innerHTML = "<P>Browser don't support geolocation</p>";
}

function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude, longitude);
  getWeather(latitude, longitude);
  getDays(latitude, longitude);
}

function setError(error) {
  NotificationElement.style.display = "block";
  NotificationElement.innerHTML = `<P>${error.message}</p>`;
}

// Calling  Api for current weather forecast
async function getWeather(latitude, longitude) {
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=5c2ec91ebf2d5326b40c0ef21fbe6eb9`;
  const response = await fetch(api);
  const data = await response.json();

  const name = data.name;
  const temp = Math.round(data.main.temp - 273);
  const id = data.weather[0].id;
  const humidity = data.main.humidity;
  const pressure = data.main.pressure;

  // Displaying current forecast
  city.innerHTML = name;
  temperatureDegree.innerHTML = temp;
  Humidity.innerHTML = humidity;
  Pressure.innerHTML = pressure;

  // Current Icons
  if ((id >= 200) & (id <= 232)) {
    temperatureIcon.src = "./icons/thunderStorm.png";
  } else if ((id >= 300) & (id <= 321)) {
    temperatureIcon.src = "./icons/Drizzle.png";
  } else if ((id >= 500) & (id <= 531)) {
    temperatureIcon.src = "./icons/rain.png";
  } else if ((id >= 600) & (id <= 622)) {
    temperatureIcon.src = "./icons/snow.png";
  } else if ((id >= 701) & (id <= 781)) {
    temperatureIcon.src = "./icons/atmosphere.png";
  } else if (id === 800) {
    temperatureIcon.src = "./icons/clear.png";
  } else if ((id >= 800) & (id <= 804)) {
    temperatureIcon.src = "./icons/cloud.png";
  }
}

// Calling another Api for daily weather forecast
async function getDays(latitude, longitude) {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=5c2ec91ebf2d5326b40c0ef21fbe6eb9`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  let now = Math.round(data.daily[0].temp.day - 273);
  let day1 = Math.round(data.daily[1].temp.day - 273);
  let day2 = Math.round(data.daily[2].temp.day - 273);
  let day3 = Math.round(data.daily[3].temp.day - 273);
  let day4 = Math.round(data.daily[4].temp.day - 273);
  let day5 = Math.round(data.daily[5].temp.day - 273);

  // Displaying daily forecast
  document.getElementById("wrapper-day-now").innerHTML = now + "&deg";
  document.getElementById("wrapper-day1").innerHTML = day1 + "&deg";
  document.getElementById("wrapper-day2").innerHTML = day2 + "&deg";
  document.getElementById("wrapper-day3").innerHTML = day3 + "&deg";
  document.getElementById("wrapper-day4").innerHTML = day4 + "&deg";
  document.getElementById("wrapper-day5").innerHTML = day5 + "&deg";

  // settingUp days
  let dayNow = new Date();
  let days1 = dayNow.getDay();
  let days2 = days1 + 1;
  let days3 = days2 + 1;
  let days4 = days3 + 1;
  let days5 = days4 + 1;

  switch (days1) {
    case 0:
      days1 = "Sun";
      break;
    case 1:
      day1 = "Mon";
      break;
    case 2:
      days1 = "Tue";
      break;
    case 3:
      days1 = "Wed";
      break;
    case 4:
      days1 = "Thu";
      break;
    case 5:
      days1 = "Fri";
      break;
    case 6:
      days1 = "Sat";
      break;
  }

  switch (days2) {
    case 0:
      days2 = "Sun";
      break;
    case 1:
      days2 = "Mon";
      break;
    case 2:
      days2 = "Tue";
      break;
    case 3:
      days2 = "Wed";
      break;
    case 4:
      days2 = "Thu";
      break;
    case 5:
      days2 = "Fri";
      break;
    case 6:
      days2 = "Sat";
      break;
  }

  switch (days3) {
    case 0:
      days3 = "Sun";
      break;
    case 1:
      days3 = "Mon";
      break;
    case 2:
      days3 = "Tue";
      break;
    case 3:
      days3 = "Wed";
      break;
    case 4:
      days3 = "Thu";
      break;
    case 5:
      days3 = "Fri";
      break;
    case 6:
      days3 = "Sat";
      break;
  }

  switch (days4) {
    case 0:
      days4 = "Sun";
      break;
    case 1:
      days4 = "Mon";
      break;
    case 2:
      days4 = "Tue";
      break;
    case 3:
      days4 = "Wed";
      break;
    case 4:
      days4 = "Thu";
      break;
    case 5:
      days4 = "Fri";
      break;
    case 6:
      days4 = "Sat";
      break;
  }

  switch (days5) {
    case 7:
      days5 = "Sun";
      break;
    case 1:
      days5 = "Mon";
      break;
    case 2:
      days5 = "Tue";
      break;
    case 3:
      days5 = "Wed";
      break;
    case 4:
      days5 = "Thu";
      break;
    case 5:
      days5 = "Fri";
      break;
    case 6:
      days5 = "Sat";
      break;
  }
  document.getElementById("wrapper-time1").innerHTML = days1;
  document.getElementById("wrapper-time2").innerHTML = days2;
  document.getElementById("wrapper-time3").innerHTML = days3;
  document.getElementById("wrapper-time4").innerHTML = days4;
  document.getElementById("wrapper-time5").innerHTML = days5;

  // Daily Icons
  const id_Now = data.current.weather[0].id;
  const id_Daily1 = data.daily[0].weather[0].id;
  const id_Daily2 = data.daily[1].weather[0].id;
  const id_Daily3 = data.daily[2].weather[0].id;
  const id_Daily4 = data.daily[3].weather[0].id;
  const id_Daily5 = data.daily[4].weather[0].id;

  // Daily_Now
  const temperatureIcon = document.getElementById("wrapper-icon-daily-row");

  if (id_Now >= 200 && id_Now <= 232) {
    temperatureIcon.src = "./icons/thunderStorm.png";
  } else if (id_Now >= 300 && id_Now <= 321) {
    temperatureIcon.src = "./icons/Drizzle.png";
  } else if (id_Now >= 500 && id_Now <= 531) {
    temperatureIcon.src = "./icons/rain.svg";
  } else if (id_Now >= 600 && id_Now <= 622) {
    temperatureIcon.src = "./icons/snow.png";
  } else if (id_Now >= 701 && id_Now <= 781) {
    temperatureIcon.src = "./icons/atmosphere.png";
  } else if (id_Now === 800) {
    temperatureIcon.src = "./icons/clear.png";
  } else if (id_Now >= 800 && id_Now <= 804) {
    temperatureIcon.src = "./icons/cloud.png";
  }

  // Daily1
  const temperatureIcon1 = document.getElementById("wrapper-icon-daily1");

  if (id_Daily1 >= 200 && id_Daily1 <= 232) {
    temperatureIcon1.src = "./icons/thunderStorm.png";
  } else if (id_Daily1 >= 300 && id_Daily1 <= 321) {
    temperatureIcon1.src = "./icons/Drizzle.png";
  } else if (id_Daily1 >= 500 && id_Daily1 <= 531) {
    temperatureIcon1.src = "./icons/rain.svg";
  } else if (id_Daily1 >= 600 && id_Daily1 <= 622) {
    temperatureIcon1.src = "./icons/snow.png";
  } else if (id_Daily1 >= 701 && id_Daily1 <= 781) {
    temperatureIcon1.src = "./icons/atmosphere.png";
  } else if (id_Daily1 === 800) {
    temperatureIcon1.src = "./icons/clear.png";
  } else if (id_Daily1 >= 800 && id_Daily1 <= 804) {
    temperatureIcon1.src = "./icons/cloud.png";
  }

  // Daily2
  const temperatureIcon2 = document.getElementById("wrapper-icon-daily2");

  if (id_Daily2 >= 200 && id_Daily2 <= 232) {
    temperatureIcon2.src = "./icons/thunderStorm.png";
  } else if (id_Daily2 >= 300 && id_Daily2 <= 321) {
    temperatureIcon2.src = "./icons/Drizzle.png";
  } else if (id_Daily2 >= 500 && id_Daily2 <= 531) {
    temperatureIcon2.src = "./icons/rain.png";
  } else if (id_Daily2 >= 600 && id_Daily2 <= 622) {
    temperatureIcon2.src = "./icons/snow.png";
  } else if (id_Daily2 >= 701 && id_Daily2 <= 781) {
    temperatureIcon2.src = "./icons/atmosphere.png";
  } else if (id_Daily2 === 800) {
    temperatureIcon2.src = "./icons/clear.png";
  } else if (id_Daily2 >= 800 && id_Daily2 <= 804) {
    temperatureIcon2.src = "./icons/cloud.png";
  }

  // Daily3
  const temperatureIcon3 = document.getElementById("wrapper-icon-daily3");

  if (id_Daily3 >= 200 && id_Daily3 <= 232) {
    temperatureIcon3.src = "./icons/thunderStorm.png";
  } else if (id_Daily3 >= 300 && id_Daily3 <= 321) {
    temperatureIcon3.src = "./icons/Drizzle.png";
  } else if (id_Daily3 >= 500 && id_Daily3 <= 531) {
    temperatureIcon3.src = "./icons/rain.png";
  } else if (id_Daily3 >= 600 && id_Daily3 <= 622) {
    temperatureIcon3.src = "./icons/snow.png";
  } else if (id_Daily3 >= 701 && id_Daily3 <= 781) {
    temperatureIcon3.src = "./icons/atmosphere.png";
  } else if (id_Daily3 === 800) {
    temperatureIcon3.src = "./icons/clear.png";
  } else if (id_Daily3 >= 800 && id_Daily3 <= 804) {
    temperatureIcon3.src = "./icons/cloud.png";
  }

  // Daily4
  const temperatureIcon4 = document.getElementById("wrapper-icon-daily4");

  if (id_Daily4 >= 200 && id_Daily4 <= 232) {
    temperatureIcon4.src = "./icons/thunderStorm.png";
  } else if (id_Daily4 >= 300 && id_Daily4 <= 321) {
    temperatureIcon4.src = "./icons/Drizzle.png";
  } else if (id_Daily4 >= 500 && id_Daily4 <= 531) {
    temperatureIcon4.src = "./icons/rain.png";
  } else if (id_Daily4 >= 600 && id_Daily4 <= 622) {
    temperatureIcon4.src = "./icons/snow.png";
  } else if (id_Daily4 >= 701 && id_Daily4 <= 781) {
    temperatureIcon4.src = "./icons/atmosphere.png";
  } else if (id_Daily4 === 800) {
    temperatureIcon4.src = "./icons/clear.png";
  } else if (id_Daily4 >= 800 && id_Daily4 <= 804) {
    temperatureIcon4.src = "./icons/cloud.png";
  }

  // Daily5
  const temperatureIcon5 = document.getElementById("wrapper-icon-daily5");

  if (id_Daily5 >= 200 && id_Daily5 <= 232) {
    temperatureIcon5.src = "./icons/thunderStorm.png";
  } else if (id_Daily5 >= 300 && id_Daily5 <= 321) {
    temperatureIcon5.src = "./icons/Drizzle.png";
  } else if (id_Daily5 >= 500 && id_Daily5 <= 531) {
    temperatureIcon5.src = "./icons/rain.png";
  } else if (id_Daily5 >= 600 && id_Daily5 <= 622) {
    temperatureIcon5.src = "./icons/snow.png";
  } else if (id_Daily5 >= 701 && id_Daily5 <= 781) {
    temperatureIcon5.src = "./icons/atmosphere.png";
  } else if (id_Daily5 === 800) {
    temperatureIcon5.src = "./icons/clear.png";
  } else if (id_Daily5 >= 800 && id_Daily5 <= 804) {
    temperatureIcon5.src = "./icons/cloud.png";
  }
}
