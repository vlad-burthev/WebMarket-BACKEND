import { v4 as uuidv4 } from "uuid";
import * as path from "path";
import { Device, DeviceInfo } from "../models/models.js";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const convertToSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
};

export const createDevice = async (req, res) => {
  try {
    const { name, price, typeId, brandId, info } = req.body;

    const { img } = req.files;
    let fileName = uuidv4() + ".jpg";
    img.mv(path.join(__dirname, "..", "static", fileName));
    const slug = convertToSlug(name);

    const createDevice = await Device.create({
      slug,
      name,
      price,
      brandId,
      typeId,
      img: fileName,
    });

    if (info) {
      info = JSON.parse(info);
      info.forEach((element) => {
        DeviceInfo.create({
          title: element.title,
          description: element.description,
          deviceId: createDevice.id,
        });
      });
    }

    return res.json({ createDevice });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

export const getOneDevice = async (req, res) => {
  try {
    const { slug } = req.params;
    const existingDevice = await Device.findOne({ where: { slug } });
    if (!existingDevice) {
      return res.json({ message: "This device does not exist." });
    }

    return res.json(existingDevice);
  } catch (error) {
    return res.json({ message: error.message });
  }
};

export const getAllDevices = async (req, res) => {
  try {
    const devices = await Device.findAndCountAll();
    return res.json(devices);
  } catch (error) {
    return res.json({ message: error.message });
  }
};
