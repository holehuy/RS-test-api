require('dotenv').config();
export default {
  port: process.env.PORT,
  host: process.env.HOST,
  dbUri: process.env.MONGODB_URL,
};
