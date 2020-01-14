import 'core-js/stable';
import 'regenerator-runtime/runtime';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import LOGGER from 'morgan';

import Connection from './db/connection';
import { SERVER_SETTINGS, DB_SETTINGS } from './constants';
import {
  InvoiceApi,
  WeatherApi
 } from './api';

let MONGO_DB_URL;
let API_PORT;

if (process.env.NODE_ENV === 'production') {
  MONGO_DB_URL = DB_SETTINGS.MONGO_ATLAS.URI;
  API_PORT = process.env.PORT || 3000;
} else {
  MONGO_DB_URL = `mongodb://${DB_SETTINGS.MONGO.IP}:${DB_SETTINGS.MONGO.PORT}/${DB_SETTINGS.MONGO.NAME}`;
  API_PORT = SERVER_SETTINGS.API.PORT;
}

const connection = new Connection();
connection.connect(MONGO_DB_URL);

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(LOGGER('dev'));
app.use('/api', InvoiceApi);
app.use('/api', WeatherApi);
app.listen(API_PORT, () => {
  console.log(`# SERVER IS UP AND RUNNING ON PORT ${API_PORT}`);
})




