import { Basket, BasketDevice } from "../models/models.js";
import { configDotenv } from "dotenv";
import { decodeToken } from "../helpers/decodeToken.js";
import ApiError from "../error/ApiError.js";
configDotenv();

export const addDeviceToBasket = async (req, res) => {
  try {
    // Получаем данные о девайсе из req.body
    const {
      deviceId,
      deviceSlug,
      deviceName,
      devicePrice,
      deviceImg,
      deviceTypeId,
      deviceBrandId,
    } = req.body;

    // Получаем токен пользователя из req.headers
    const token = req.headers.authorization;

    // Декодируем токен
    const user = decodeToken(token);

    // Получаем id пользователя(user.id) и находим корзину связанную с этим id
    const basket = await Basket.findOne({
      where: { userId: user.id },
    });

    // Добавляем device и передаём id корзины
    const addedDeviceToBasket = await BasketDevice.create({
      deviceId,
      deviceSlug,
      deviceName,
      devicePrice,
      deviceImg,
      deviceTypeId,
      deviceBrandId,
      basketId: basket.id,
    });

    return res.json(addedDeviceToBasket);
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};

export const deleteDevicesFromBasket = async (req, res) => {
  try {
    // Получаем данные о девайсе из req.body
    const { deviceId, count = 1 } = req.body;

    // Получаем токен пользователя из req.headers
    const token = req.headers.authorization;

    // Декодируем токен
    const user = decodeToken(token);

    // Получаем id пользователя (user.id) и находим корзину связанную с этим id
    await Basket.findOne({
      where: { userId: user.id },
    });

    const existingDevice = await BasketDevice.findOne({ where: deviceId });
    if (!existingDevice) {
      return next(
        ApiError.badRequest("This device was not found in the cart.")
      );
    }

    const existingDeviceCount = await BasketDevice.count({
      where: { deviceId },
    });
    if (existingDeviceCount < count) {
      return next(
        ApiError.badRequest(
          "You requested to delete more devices than there are in the basket."
        )
      );
    }

    // Удаляем указанное количество девайсов с определенным deviceId из корзины
    for (let i = 0; i < count; i++) {
      const existingDevice = await BasketDevice.findOne({
        where: { deviceId },
      });

      if (existingDevice) {
        await existingDevice.destroy();
      }
    }

    return res.status(204).json({ message: "Device(s) successfuly destoy" });
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};

export const getBasket = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const user = decodeToken(token);
    const basket = await Basket.findOne({
      where: { userId: user.id },
      include: [{ model: BasketDevice, as: "basket_device" }],
    });
    return res.status(200).json(basket);
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};
