import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../../../../utils/LoadingSpinner";
import { WiDaySunny, WiCloudyGusts } from "weather-icons-react";

import "./Weather.css";
const Weather = props => {
  /*
    First We Fetch Our Location and set it to our state
    Then we fetch the weather data
    then we display the current weather

   */
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    city: null,
    state: null,
  });
  const [weatherData, setWeatherData] = useState({
    main: null,
    clouds: null,
    temp: null,
    wind: null,
    rain: null,
    description: null,
  });
  const [error, setError] = useState(null);

  const fetchLocation = () => {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      var crd = pos.coords;
      let latitude = crd.latitude;
      let longitude = crd.longitude;

      //Here we take the coordinates we get from the native web api and use them to get the city those coords lead to
      let reverseGeocodeKey = "j5l5gEtlUQow2kzyIZmI0BvcAf4xo7By";
      axios
        .get(
          `http://www.mapquestapi.com/geocoding/v1/reverse?key=${reverseGeocodeKey}&location=${latitude},${longitude}&includeRoadMetadata=true&includeNearestIntersection=true`,
        )
        .then(data => {
          setLocation({
            latitude: latitude,
            longitude: longitude,
            city: data.data.results[0].locations[0].adminArea5,
            state: data.data.results[0].locations[0].adminArea3,
          });
        })
        .catch(err => {
          setError(err);
        });
    }
    function error(err) {
      setError(`ERROR(${err.code}): ${err.message}`);
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
    return (
      <div>
        Loading
        <LoadingSpinner />
      </div>
    );
  }
  if (weatherData.clouds === null && error !== null) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="top-of-weather">
        <p>
          {location.city},{location.state}
        </p>
        <p className="weather-icon">
          {weatherData.clouds > 30 ? (
            <WiCloudyGusts size={24} color="#0000FF" />
          ) : (
            <WiDaySunny size={24} color="#FDB813" />
          )}
        </p>
      </div>
      <div>Temperature is {Math.round(weatherData.temp)}°F</div>
      <div>{weatherData.clouds}% cloudy</div>
      <div>
        <p>{weatherData.description}</p>
        <p>with winds at {weatherData.wind}meter/sec</p>
      </div>
      {error !== null ? <p>{error}</p> : ""}
    </div>
  );
};

export default Weather;
