import axios from 'axios';
import { SERVER_SETTINGS } from '../constants';

class WeatherService {
  constructor() {
    this.get = this.get.bind(this);
    this.uri = SERVER_SETTINGS.WEATHER.URI;
    this.apiKey = SERVER_SETTINGS.WEATHER.API_KEY;
  }

  async get(query) {
    try {
      const queryParams = `lat=${query.lat}&lon=${query.lon}&cnt=${query.cnt}`;
      const path_url = `${this.uri}?${queryParams}&appid=${this.apiKey}`;
      console.log(path_url);
      let response = await axios.get(path_url);
      console.log(response)
      return {
        error: false,
        status: 200,
        data: response.data
      }
    } catch (errors) {
      return {
        error: true,
        status: 500,
        errors
      }
    }
  }
}

export default WeatherService;