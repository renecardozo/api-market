import { WeatherService } from '../services';

const weatherServiceInstance = new WeatherService();

class WeatherController {

  constructor(weatherService) {
    this.weatherService = weatherService;
    this.get = this.get.bind(this);
  }

  async get(req, res) {
    let response = await this.weatherService.get(req.query);
    return res.status(response.status).send(response);
  }

}

export default new WeatherController(weatherServiceInstance);