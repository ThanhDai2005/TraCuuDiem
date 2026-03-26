import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { mainRoutes } from "./api/routes/index.router.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  }),
);

app.use(express.json());

mainRoutes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
