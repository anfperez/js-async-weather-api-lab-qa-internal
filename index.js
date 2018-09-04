const API_KEY = "6549863730776a52fadf3fe935d5eecc";

function handleFormSubmit(event) {
  event.preventDefault()
  const input = document.getElementById("city")
  const value = input.value
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=` + value + `&APPID=${API_KEY}&units=imperial`)
  .then(response => response.json())
  .then(responseJSON => displayCurrentWeather(responseJSON))
  fetchCurrentWeather(value)
  fetchFiveDayForecast(value)
  }

function displayCurrentWeather(json) {
  //current temp, low, hi, humidity, cloud cloudCover
  const mainData = json.main
  const temp = document.getElementById("temp")
  const low = document.getElementById("low")
  const high = document.getElementById("high")
  const humidity = document.getElementById("humidity")
  const cloudCover = document.getElementById("cloudCover")
  
  temp.innerHTML = mainData.temp
  low.innerHTML = mainData.temp_min
  high.innerHTML = mainData.temp_max
  humidity.innerHTML = mainData.humidity
  cloudCover.innerHTML = json.clouds.all

}

function fetchCurrentWeather(city) {}

function fetchFiveDayForecast(city) {
  fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${API_KEY}&units=imperial&cnt=40`)
  .then(response => response.json())
  .then(responseJSON => {displayFiveDayForecast(responseJSON)
  return responseJSON
  })
  .then(responseJSON => createChart(responseJSON))
}

function displayFiveDayForecast(json) {
  console.log("putting here")
  const forecast = json.list
  const aside = document.querySelector("aside")
  let counter = 0
  let lowAverageTemp = 0
  let highAverageTemp = 0
  forecast.forEach((eachForecastItem) => {
    counter++
    lowAverageTemp += eachForecastItem.main.temp_min
    highAverageTemp += eachForecastItem.main.temp_max
    if (counter === 8) {
      counter = 0
      const div = document.createElement("div")
      div.innerHTML = `<p>${eachForecastItem.dt_txt}</p> <p>${Math.floor(lowAverageTemp / 8)}</p> <p>${Math.floor(highAverageTemp / 8) }</p>`
      lowAverageTemp = 0 
      highAverageTemp = 0 
      aside.appendChild(div)
    }
  })
}

function createChart(json) { 
  const ctx = document.getElementById("WeatherChart").getContext("2d")
  const labels = json.list.map((increment) => increment.dt_txt) //dt_txt
  console.log(labels)
  const data = json.list.map((increment) => increment.main.temp)
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'forecast',
            data: data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
  
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('cityForm').addEventListener('submit', handleFormSubmit)
});

//official answer below
/*const API_KEY = "YOUR API KEY"

function handleFormSubmit(event) {
  event.preventDefault()
  const city = document.getElementById('city').value.replace(/ /g, "+")
  fetchCurrentWeather(city)
  fetchFiveDayForecast(city)
}

function fetchCurrentWeather(city) {
  const request = `https://api.openweathermap.org/data/2.5/weather?q=${city}&type=like&units=imperial&APPID=${API_KEY}`
  fetch(request)
  .then(res => res.json())
  .then(json => {
    displayCurrentWeather(json)
  })
}

function displayCurrentWeather(json) {
  const header = document.querySelector('h2')
  const temp = document.querySelector('#temp')
  const low = document.querySelector('#low')
  const high = document.querySelector('#high')
  const humidity = document.querySelector('#humidity')
  const cloudCover = document.querySelector('#cloudCover')


  header.innerHTML = `Today in ${json.name}`
  temp.innerHTML = json.main.temp
  low.innerHTML = json.main.temp_min
  high.innerHTML = json.main.temp_max
  humidity.innerHTML = json.main.humidity
  cloudCover.innerHTML = json.clouds.all + "%"
}


function fetchFiveDayForecast(city) {
  const forecastRequest = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&type=like&units=imperial&APPID=${API_KEY}`
  fetch(forecastRequest)
  .then(res => res.json())
  .then(json => {

    displayFiveDayForecast(json)
    createChart(json)
  })
}

function displayFiveDayForecast(json) {
  const aside = document.querySelector('aside')
  json.list.forEach(forecast => {
    let div = document.createElement('div')
    div.innerHTML = `<p>${forecast.dt_txt}</p>
    <p>Temperature: ${forecast.main.temp}</p>
    <p>Humidity: ${forecast.main.humidity}</p>`

    aside.appendChild(div)
  })
}

function createChart(json) {
  var ctx = document.getElementById("WeatherChart").getContext('2d');
  var labels = json.list.map(forecast => forecast.dt_txt.slice(5,16))
  var data = json.list.map(forecast => forecast.main.temp)
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              label: 'Temperature',
              data: data,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('cityForm').addEventListener('submit', handleFormSubmit)
  document.getElementById('city').focus()
})
*/