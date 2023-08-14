import { configDotenv } from "dotenv";
import express from "express";
import sequelize from "./db.js";
import { models } from "./models/models.js";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";
import router from "./routes/index.js";
import * as path from "path";
import cors from "cors";

configDotenv(); // connected configDotenv for work with .env

//  path to static
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;

const app = express(); //  connect our app to express
app.use(express.json());
app.use(fileUpload({}));
app.use(cors());
app.use(express.static(path.resolve(__dirname, "static")));
app.use("/api", router);

const start = async () => {
  //  func for starting server
  try {
    await sequelize.authenticate(); //  connected to DB
    await sequelize.sync(models); //  checks the state of the DB with the data schema (models.js)

    // Start the server on port 5000 and log a message indicating the server has started
    app.listen(PORT, console.log(`[server] start on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
