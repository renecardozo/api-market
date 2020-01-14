import express from 'express';
import { WeatherController } from '../controllers';
const weatherRouter = express.Router();

weatherRouter.get('/weather', WeatherController.get);

export default weatherRouter;