const SERVER_SETTINGS = {
  API: {
    PORT: 8080
  },
  WEATHER: {
    //api.openweathermap.org/data/2.5/forecast/daily?q=London&mode=xml&units=metric&cnt=7
    URI: 'http://api.openweathermap.org/data/2.5/forecast',
    API_KEY: '43c08dd52abaa8e20c4325ea8623a044'
  }
}
export default SERVER_SETTINGS;