

function getWeather() {
  //Write you code logic here

  // Error should be very specific
  // Error: Failed to fetch weather data,   should always fetch this error in case of any failure otherwise you test cases will get failed.
  const container = document.getElementById("input");
  const loading = document.getElementById( "loading" );
  loading.style.display="block";

  const apiKey = '8f8e5df4f3d6d8716319c8865b616299';
  const city = document.getElementById('city').value;
  if (!city) {
    alert('Please enter a city');
    loading.style.display='none';
    return;
  }

  const currWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const foreCastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  fetch(currWeatherUrl).then(res => res.json()).then(data => {
    console.log(data);
    loading.style.display='none';
    displayWeather(data);
  })
    .catch(error => {
      console.error('Error Fetching current Weather data', error);
      loading.style.display='none';
      alert("Error");
    });

  // fetch(foreCastUrl)
  //   .then(res => res.json)
  //   .then(data => {
  //     displayHourlyForecast(data.list);
  //   })
  //   .catch(error => {
  //     console.error(error);
  //     alert("Could not retrieve forecast information.");
  //   });

}


function displayWeather(data) {
  const tempDivInfo = document.getElementById('temp-div');
  const WeatherInfoDiv = document.getElementById('weather-info');
  const weatherIcon = document.getElementById('weather-icon');
  const hourlyForecastDiv = document.getElementById('hourly-forecast');
  const weatherContainer = document.getElementById('weather-container');
  WeatherInfoDiv.innerHTML = "";
  hourlyForecastDiv.innerHTML = '';
  tempDivInfo.innerHTML = '';

  if (data.cod  === '404') {
    WeatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
  } else {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp );
    
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`
    const temperatureHTML = `<p>${temperature}&degC</p>`;
    const weatherHTML = `<p>${cityName}</p>
                        <p>${description}</p>`;
                        console.log(temperatureHTML);
    tempDivInfo.innerHTML = temperatureHTML;
    WeatherInfoDiv.innerHTML = weatherHTML;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;

    showImage();
    
    const containerHeight = tempDivInfo.offsetHeight + WeatherInfoDiv.offsetHeight + weatherIcon.offsetHeight + hourlyForecastDiv.offsetHeight;

    weatherContainer.style.height = `${containerHeight+120}px`;

    // Trigger transition by adding a class after a short delay
    setTimeout(() => {
      weatherContainer.classList.add('expand');
    }, 200); // Delay added for better transition effect

    WeatherInfoDiv.classList.add('appear');

  }
}

  // function displayHourlyForecast(hourlyData) {
  //   const hourlyForecastDiv = document.getElementById('hourly-data');
  //   const next24Hours = hourlyData.slice(0, 8);

  //   next24Hours.forEach(item => {
  //     const dateTime = new Date(item.dt * 1000);
  //     const hour = dateTime.getHours();
  //     const temperature = Math.round(item.main.temp - 273.15);
  //     const iconCode = item.weather[0].icon;
  //     const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

  //     const hourlyItemHtml = `
  //     <div class="hourly-item">
  //       <span>${hour}:00</span>
  //       <img src="${iconUrl}" alt="Hourly Weather Icon">
  //       <span>${temperature}&degC</span>
  //     </div>
  //     `;

  //     hourlyForecastDiv.innerHTML += hourlyItemHtml;
  //   })
  // }


function showImage(){
  const weatherIcon = document.getElementById('weather-icon');
  weatherIcon.style.display='block';
}