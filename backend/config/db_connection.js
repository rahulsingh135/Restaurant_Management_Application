require("dotenv").config({ quiet: true });
const { Client } = require("pg");

const POSTGRES_CONFIG = {
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  port: process.env.POSTGRES_PORT,
};

const client = new Client(POSTGRES_CONFIG);

client
  .connect()
  .then(() => console.log("Connected to POSTGRES DB"))
  .catch((err) => console.error("Connection error", err));

module.exports = client;
