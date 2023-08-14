import { configDotenv } from "dotenv";
import express from "express";
import sequelize from "./db.js";
import { models } from "./models/models.js";

configDotenv(); // connected configDotenv for work with .env

const PORT = process.env.PORT || 5000;

const app = express(); //connect our app to express

const start = async () => {
  try {
    await sequelize.authenticate(); //connected to DB
    await sequelize.sync(models); //checks the state of the DB with the data schema (models.js)
    app.listen(PORT, console.log(`[server] start on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
