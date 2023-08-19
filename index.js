import { configDotenv } from "dotenv";
import express from "express";
import sequelize from "./db.js";
import { models } from "./models/models.js";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";
import router from "./routes/index.js";
import * as path from "path";
import cors from "cors";
import errorHandler from "./middleware/ErrorHandlingMiddleware.js";

configDotenv(); // connected configDotenv for work with .env

//  path to static
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;

const app = express(); //  Подключаем express
app.use(express.json());
app.use(fileUpload({}));
app.use(cors());
app.use(express.static(path.resolve(__dirname, "static")));
app.use("/api", router);
app.use(errorHandler);

const start = async () => {
  //  func for starting server
  try {
    await sequelize.authenticate(); //  Подключаемся к БД
    await sequelize.sync(models); //  Проверяет состояние БД со схемой данных (models.js)

    // Запускаем сервер на порту 5000 и выводим сообщение что сервер запустился
    app.listen(PORT, console.log(`[server] start on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
