import dotenv from 'dotenv'
dotenv.config();
const env = process.env;

const development = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE_DEV,
  host: env.MYSQL_HOST,
  dialect: "mysql"
};

const production = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE_TEST,
  host: env.MYSQL_HOST,
  dialect: "mysql"
};

const test = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE_PROD,
  host: env.MYSQL_HOST,
  dialect: "mysql"
};

export { development, production, test };