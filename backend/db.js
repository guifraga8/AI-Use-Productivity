import dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;

const connectionString = `postgresql://${dbUser}${
  dbPassword ? `:${dbPassword}` : ""
}@${dbHost}:${dbPort}/${dbName}`;

const pool = new Pool({
  connectionString,
});

export default pool;
