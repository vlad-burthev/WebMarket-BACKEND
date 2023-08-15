import { Order, OrderDevice } from "../models/models.js";
import { configDotenv } from "dotenv";
import { decodeToken } from "../helpers/decodeToken.js";
configDotenv();

export const addDeviceToOrder = async (req, res) => {
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

    // Получаем id пользователя(user.id) и находим order связанную с этим id
    const order = await Order.findOne({
      where: { userId: user.id },
    });

    // Добавляем device и передаём id корзины
    const addedDeviceToOrder = await OrderDevice.create({
      deviceId,
      deviceSlug,
      deviceName,
      devicePrice,
      deviceImg,
      deviceTypeId,
      deviceBrandId,
      orderId: order.id,
    });

    return res.json(addedDeviceToOrder);
  } catch (error) {
    return res.json({ message: error.message });
  }
};

export const deleteDevicesFromOrder = async (req, res) => {
  try {
    // Получаем данные о девайсе из req.body
    const { deviceId, count = 1 } = req.body;

    // Получаем токен пользователя из req.headers
    const token = req.headers.authorization;

    // Декодируем токен
    const user = decodeToken(token);

    // Получаем id пользователя (user.id) и находим корзину связанную с этим id
    await Order.findOne({
      where: { userId: user.id },
    });

    const existingDevice = await OrderDevice.findOne({ where: deviceId });
    if (!existingDevice) {
      return res.json({ message: "This device was not found in the cart." });
    }

    const existingDeviceCount = await OrderDevice.count({
      where: { deviceId },
    });
    if (existingDeviceCount < count) {
      return res.json({
        message:
          "You requested to delete more devices than there are in the order.",
      });
    }

    // Удаляем указанное количество девайсов с определенным deviceId из корзины
    for (let i = 0; i < count; i++) {
      const existingDevice = await OrderDevice.findOne({
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

export const getOrder = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const user = decodeToken(token);
    const order = await Order.findOne({
      where: { userId: user.id },
      include: [{ model: OrderDevice, as: "order_device" }],
    });
    return res.json(order);
  } catch (error) {
    return res.json({ message: error.message });
  }
};
