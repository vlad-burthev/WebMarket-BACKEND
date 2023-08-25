import { v4 as uuidv4 } from "uuid";
import * as path from "path";
import { Device, DeviceInfo, Rating } from "../models/models.js";
import ApiError from "../error/ApiError.js";
import { fileURLToPath } from "url";
import { json } from "sequelize";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const convertToSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
};

export const createDevice = async (req, res, next) => {
  try {
    const { name, price, typeId, brandId, info } = req.body;

    const { img } = req.files;
    let fileName = uuidv4() + ".jpg";
    img.mv(path.join(__dirname, "..", "static", fileName));
    let slug = convertToSlug(name);

    const createDevice = await Device.create({
      slug,
      name,
      price,
      brandId,
      typeId,
      img: fileName,
    });

    if (info) {
      const parsedInfo = JSON.parse(info);
      parsedInfo.forEach((element) => {
        DeviceInfo.create({
          title: element.title,
          description: element.description,
          deviceId: createDevice.id,
        });
      });
    }

    return res.status(200).json({ createDevice });
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};

export const getOneDevice = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const device = await Device.findOne({
      where: { slug },
      include: [
        {
          model: DeviceInfo,
          as: "info",
        },
        {
          model: Rating,
          foreignKey: "deviceId",
        },
      ],
    });
    if (!device) {
      return next(ApiError.badRequest("This device does not exist."));
    }

    return res.status(200).json(device);
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};

export const getAllDevices = async (req, res, next) => {
  try {
    const { page = 1, limit = 24, typeId, brandId } = req.query;
    let offset = page * limit - limit;
    let devices;
    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({ limit, offset });
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId, brandId },
        limit,
        offset,
        brandId,
      });
    }

    return res.status(200).json(devices);
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};

export const deleteDevice = async (req, res, next) => {
  try {
    const { name } = req.body;

    const device = await Device.findOne({ where: { name } });
    if (!device) {
      return next(ApiError.badRequest("Such device doesn't exist!"));
    }
    await device.destroy();
    return res
      .status(204)
      .json(`Device '${device.name}' successfully destroy.`);
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};
