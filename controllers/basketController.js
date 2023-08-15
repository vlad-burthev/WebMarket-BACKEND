import { Basket, BasketDevice } from "../models/models.js";
import { configDotenv } from "dotenv";
import { decodeToken } from "../helpers/decodeToken.js";
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
    const decodedTokend = decodeToken(token);

    // Получаем id пользователя(decodedTokend.id) и находим корзину связанную с этим id
    const basket = await Basket.findOne({
      where: { userId: decodedTokend.id },
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
    return res.json({ message: error.message });
  }
};

export const deleteDevicesFromBasket = async (req, res) => {
  try {
    // Получаем данные о девайсе из req.body
    const { deviceId, count = 1 } = req.body;

    // Получаем токен пользователя из req.headers
    const token = req.headers.authorization;

    // Декодируем токен
    const decodedToken = decodeToken(token);

    // Получаем id пользователя (decodedToken.id) и находим корзину связанную с этим id
    await Basket.findOne({
      where: { userId: decodedToken.id },
    });

    const existingDevice = await BasketDevice.findOne({ where: deviceId });
    if (!existingDevice) {
      return res.json({ message: "This device was not found in the cart." });
    }

    const existingDeviceCount = await BasketDevice.count({
      where: { deviceId },
    });
    if (existingDeviceCount < count) {
      return res.json({
        message:
          "You requested to delete more devices than there are in the basket.",
      });
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

    return res.json({ message: "Device(s) successfuly destoy" });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

export const getBasket = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decodedTokend = decodeToken(token);
    const basket = await Basket.findOne({
      where: { userId: decodedTokend.id },
      include: [{ model: BasketDevice, as: "basket_device" }],
    });
    return res.json(basket);
  } catch (error) {
    return res.json({ message: error.message });
  }
};
