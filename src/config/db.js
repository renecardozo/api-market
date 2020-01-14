import { DB_SETTINGS } from '../constants';
const MONGO_DB_URL = `mongodb://${DB_SETTINGS.MONGO.IP}:${DB_SETTINGS.MONGO.PORT}/${DB_SETTINGS.MONGO.NAME}`;
export default MONGO_DB_URL;