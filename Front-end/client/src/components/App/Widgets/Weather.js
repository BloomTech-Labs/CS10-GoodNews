import React, { Component } from 'react'
import WeatherIcon from 'react-icons-weather'
import { Grid, Loader } from 'semantic-ui-react'
import axios from 'axios'
import * as weatherIcons from './weatherIcons.json.js'

class Weather extends Component {
  constructor (props) {
    super(props)
    this.state = {
      current: null,
      forecast: null,
      location: null,
      geolocation: false,
      loading: true
    }
  }

  componentDidMount () {
    this.getWeather()
  }

  getGeolocation = () => {
    navigator.geolocation.getCurrentPosition(success => {
      this.setState({ loading: true })
      const lat = success.coords.latitude
      const long = success.coords.longitude
      sessionStorage.setItem('lat', lat)
      sessionStorage.setItem('long', long)
      this.getWeather()
    })
  }

  getWeather = (zip = null) => {
    const weatherAPI = 'https://api.apixu.com/v1/forecast.json'
    const key = '61e020a41ccd4b1d945190151182409'

    // if user's location is stored in session, use it to get weather
    let lat = sessionStorage.getItem('lat')
    let long = sessionStorage.getItem('long')

    // if user doesn't provide a location and has not allowed access to geolocation,
    // use zip code from Washington DC for weather data
    let location = zip || 20500
    if (lat && long) {
      this.setState({ geolocation: true })
      location = `${lat},${long}`
    }
    axios.get(`${weatherAPI}?key=${key}&q=${location}&days=5`)
      .then(weather => {
        this.setState({
          current: weather.data.current,
          forecast: weather.data.forecast.forecastday,
          location: weather.data.location,
          loading: false
        })
      })
  }

  getDayOfWeek = (date) => {
    var dayOfWeek = new Date(date).getDay()
    return isNaN(dayOfWeek) ? null : (
      ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'][dayOfWeek]
    )
  }

  render () {
    return (
      <div className='weatherWidget'>
        <Grid centered>
          <Grid.Row stretched columns={2}>
            <Grid.Column textAlign='right' width={5} verticalAlign='middle'>
              <Loader active={this.state.loading} />
              {this.state.loading === false && <WeatherIcon name='owm' style={{ fontSize: '4rem' }}
                iconId={weatherIcons[this.state.current.condition.code]} />}
            </Grid.Column>
            <Grid.Column verticalAlign='middle' width={11}>
              <Grid.Row style={{ fontSize: '1.4rem' }}>
                {this.state.loading ? 'Fetching weather data' : this.state.location.name.toUpperCase() }
              </Grid.Row>
              <Grid.Row style={{ fontSize: '3em' }}>
                {this.state.loading ? '--' : this.state.current.temp_f}º
              </Grid.Row>
              <Grid.Row>
                {this.state.loading ? '--' : this.state.current.condition.text }
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
          {this.state.loading === false && <Grid.Row columns='equal' only='computer tablet'>
            {this.state.forecast.map(day => {
              return (
                <Grid.Column verticalAlign='middle' key={day.date}>
                  <Grid.Row>{this.getDayOfWeek(day.date)}</Grid.Row>
                  <Grid.Row style={{ padding: '10px 0px 4px 0px' }}>
                    <WeatherIcon name='owm' style={{ fontSize: '1.5em' }}
                      iconId={weatherIcons[day.day.condition.code]} />
                  </Grid.Row>
                  <Grid.Row>{day.day.maxtemp_f}º</Grid.Row>
                  <Grid.Row style={{ fontSize: '0.7rem' }}>{day.day.mintemp_f}º</Grid.Row>
                </Grid.Column>
              )
            })}
          </Grid.Row>}
          {(this.state.geolocation === false && this.state.current) &&
          <Grid.Row textAlign='center'>
            <span className='geolocation' onClick={this.getGeolocation}>Use my location</span>
          </Grid.Row>}
        </Grid>
      </div>
    )
  }
}

export default Weather
