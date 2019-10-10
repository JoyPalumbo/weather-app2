import React from 'react';
// import axios from 'axios';
import logo from './cuteCloud.jpg';
// import logo from './logo.svg';
import './App.css';

// let APIkey = `{process.env.REACT_APP_WEATHER_API_KEY}`;

// import { geolocated, geoPropTypes } from "react-geolocated";

// var api = https://fcc-weather-api.glitch.me/
//bla
//input box for location
//api key/end point
//access image from json file at weather[0].icon
//convert city into lat and long


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: undefined,
      lon: undefined,
      city: undefined,
      tempC: undefined,
      tempF: undefined,
      icon: undefined,
      description: 'cloudy',
      errorMessage: undefined,
    };
  }

  getPosition = () => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  getWeather = async (latitude, longitude) => {
    const API = await fetch(`//api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`);
    const data = await API.json();
    this.setState({
      // lat and long may be data.coord.lat/lon
      lat: latitude,
      lon: longitude,
      //will need to change city, tempC, tempF data
      city: data.name,
      tempC: Math.round(data.main.temp),
      tempF: Math.round(data.main.temp * 1.8 + 32),
      icon: data.weather[0].icon,
      description: data.weather[0].main,
    })
  }

  componentDidMount() {
    this.getPosition()
      .then((position) => {
        this.getWeather(position.coords.latitude, position.coords.longitude)
      })
      .catch((err) => {
        this.setState({ errorMessage: err.messsage });
      });
  }

  render() {
    const { city, tempC, tempF, icon, description } = this.state;
    if (city) {
      return (
        <div className="App" >
          <body className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Joy's Weather App</h1>
            <div className="weather-item">{city}</div>
            <div className="weather-item">{tempC} &deg;C <span className="slack">/</span>{tempF} &deg;F</div>
            <div>
              <img className="weather-icon" src={`http://openweathermap.org/img/w/${icon}.png`} alt="weather icon" />
            </div>
            <div className="weatjher-item">
              <span>Weather: {description}</span>
            </div>
          </body>
        </div>
      );
    }
    else {
      return (
        <div>Loading...</div>
      )
    }
  }
}
export default App;
