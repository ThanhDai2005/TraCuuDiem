import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbSouth = mysql.createPool({
  host: process.env.DB_SOUTH_HOST,
  port: Number(process.env.DB_SOUTH_PORT),
  user: process.env.DB_SOUTH_USER,
  password: process.env.DB_SOUTH_PASSWORD,
  database: process.env.DB_SOUTH_NAME,
});

export default dbSouth;
