import dotenv from "dotenv";
dotenv.config();
const env = process.env;

export const dbconfig = {
  development: {
    username: env.DB_DEV_USERNAME,
    password: env.DB_DEV_PASSWORD,
    database: env.DB_DEV_DATABASE_DEV,
    host: env.DB_DEV_HOST,
    port: env.DB_DEV_PORT,
    dialect: "mysql",
  },
  production: {
    username: env.DB_PROD_USERNAME,
    password: env.DB_PROD_PASSWORD,
    database: env.DB_PROD_DATABASE,
    host: env.DB_PROD_HOST,
    port: env.DB_PROD_PORT,
    dialect: "mariadb",
  },
  test: {
    username: env.DB_TEST_USERNAME,
    password: env.DB_TEST_PASSWORD,
    database: env.DB_TEST_DATABASE,
    host: env.DB_TEST_HOST,
    port: env.DB_TEST_PORT,
    dialect: "mysql",
  },
};
