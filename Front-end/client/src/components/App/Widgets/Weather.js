import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = props => {
  /*
    First We Fetch Our Location and set it to our state
    Then we fetch the weather data
    then we display the current weather

   */
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [weatherData, setWeatherData] = useState({
    main: null,
    clouds: null,
    temp: null,
    wind: null,
    rain: null,
    description: null,
  });
  const [error, setError] = useState();

  const fetchLocation = () => {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      var crd = pos.coords;
      let latitude = Math.floor(crd.latitude);
      let longitude = Math.floor(crd.longitude);
      setLocation({ latitude: latitude, longitude: longitude });
    }
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  };
  const fetchWeatherData = () => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=be0638dd3dd4ea9604b04e2419cbc848`,
      )
      .then(weather => {
        console.log(weather, "weather");
        //Converting Our Temperature response from Kelvin to F
        let temperature = (weather.data.main.temp - 273.15) * 1.8 + 32;
        let stateObj = {
          main: weather.data.weather[0].main,
          clouds: weather.data.clouds.all,
          temp: temperature,
          wind: weather.data.wind.speed,
          rain: weather.data.rain,
          description: weather.data.weather[0].description,
        };
        setWeatherData(stateObj);
      })
      .catch(err => {
        setError(err);
      });
  };

  //If no weather data has been fetched we stay in the loading state of the component
  if (weatherData.clouds === null) {
    fetchLocation();

    if (location.latitude !== 0 && location.longitude !== 0) {
      fetchWeatherData();
    }
    return <div></div>;
  }
  return (
    <div>
      <div>Temperature is {Math.round(weatherData.temp)}°F</div>
      <div>{weatherData.clouds}% cloudy</div>
      <div>
        <p>{weatherData.description}</p>
        <p>with winds at {weatherData.wind}meter/sec</p>
      </div>
    </div>
  );
};

export default Weather;
