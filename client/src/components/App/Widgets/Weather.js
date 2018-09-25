import React, { Component } from 'react';
import WeatherIcon from 'react-icons-weather'
import { Grid } from 'semantic-ui-react';
import axios from 'axios';
import * as weatherIcons from './weatherIcons.json'

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      current: null,
      forecast: null,
      location: null,
      lat: null,
      long: null
    }
  }

  componentDidMount() {
    this.getWeather();
  }

  getWeather = () => {
    const weatherAPI = 'http://api.apixu.com/v1/forecast.json'
    const key = '61e020a41ccd4b1d945190151182409'
    const userZip = localStorage.getItem('location')
    const location =  userZip ? userZip : 'auto:ip'

    axios.get(`${weatherAPI}?key=${key}&q=${location}&days=5`)
      .then( weather => {
        this.setState({ 
          current: weather.data.current,
          forecast: weather.data.forecast.forecastday,
          location: weather.data.location,
        })
      })
  }

  getDayOfWeek = (date) => {
    var dayOfWeek = new Date(date).getDay();    
    return isNaN(dayOfWeek) ? null : (
      ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOfWeek]
    );
  }

  render() { 
    return (
      <div style={{ 
          backgroundColor: '#eeeeee', 
          width: '100%', 
          minHeight: '100px',
          padding: '30px',
          color: '#3d3d3d' }}>
        <Grid centered>
          <Grid.Row stretched columns={2}>
            <Grid.Column textAlign='right' width={5} verticalAlign='middle'>
              {this.state.current && <WeatherIcon name='owm' style={{ fontSize: '4rem' }}
                iconId={weatherIcons[this.state.current.condition.code]}/>}
            </Grid.Column>
            <Grid.Column verticalAlign='middle' width={11}>
              <Grid.Row style={{ fontSize: '1.4rem' }}>
                {this.state.current ? this.state.location.name : 'Fetching weather data'}
              </Grid.Row>
              <Grid.Row style={{ fontSize: '3em' }}>
                {this.state.current ? this.state.current.temp_f : '--'}º
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
          {this.state.forecast && <Grid.Row columns='equal'>
            {this.state.forecast.map(day => {
              return (
                <Grid.Column verticalAlign='middle' key={day.date}>
                  <Grid.Row>{this.getDayOfWeek(day.date)}</Grid.Row>
                  <Grid.Row style={{ padding: '10px 0px 4px 0px' }}>
                    <WeatherIcon name='owm' style={{ fontSize: '1.5em' }}
                      iconId={weatherIcons[day.day.condition.code]}/>
                  </Grid.Row>
                  <Grid.Row>{day.day.maxtemp_f}º</Grid.Row>
                  <Grid.Row style={{ fontSize: '0.7rem' }}>{day.day.mintemp_f}º</Grid.Row>
                </Grid.Column>
              );
            })}
          </Grid.Row>}
        </Grid>
      </div>
    );
  }
}

export default Weather;