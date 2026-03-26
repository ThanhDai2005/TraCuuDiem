import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbNorth = mysql.createPool({
  host: process.env.DB_NORTH_HOST,
  port: Number(process.env.DB_NORTH_PORT),
  user: process.env.DB_NORTH_USER,
  password: process.env.DB_NORTH_PASSWORD,
  database: process.env.DB_NORTH_NAME,
});

export default dbNorth;
