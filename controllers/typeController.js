import { Type } from "../models/models.js";

export const createType = async (req, res) => {
  try {
    const { name } = req.body;

    const existingType = await Type.findOne({ where: { name } });
    if (existingType) {
      return res.json({ message: "Such type already exists!" });
    }

    const createType = await Type.create({ name });
    return res.json(createType);
  } catch (error) {
    return res.json({ message: error.message });
  }
};

export const getTypes = async (req, res) => {
  try {
    const allTypes = await Type.findAll();
    return res.json(allTypes);
  } catch (error) {
    return res.json({ message: error.message });
  }
};

export const deleteType = async (req, res) => {
  try {
    const { name } = req.body;
    const existingType = await Type.findOne({ where: { name } });
    if (!existingType) {
      return res.json({ message: "Such type doesn't exist!" });
    }
    existingType.destroy();

    return res.json({
      message: `Type '${existingType.name}' successfully destroy`,
    });
  } catch (error) {
    return res.json({ message: error.message });
  }
};
