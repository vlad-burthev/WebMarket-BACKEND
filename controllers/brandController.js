import { Brand } from "../models/models.js";

export const createBrand = async (req, res) => {
  try {
    const { name } = req.body;

    const existingBrand = await Brand.findOne({ where: { name } });
    if (existingBrand) {
      return res.json({ message: "Such Brand already exists!" });
    }

    const createBrand = await Brand.create({ name });
    return res.json(createBrand);
  } catch (error) {
    return res.json({ message: error.message });
  }
};

export const getBrands = async (req, res) => {
  try {
    const allBrands = await Brand.findAll();
    return res.json(allBrands);
  } catch (error) {
    return res.json({ message: error.message });
  }
};

export const deleteBrand = async (req, res) => {
  try {
    const { name } = req.body;
    const existingBrand = await Brand.findOne({ where: { name } });
    if (!existingBrand) {
      return res.json({ message: "Such brand doesn't exist!" });
    }
    existingBrand.destroy();

    return res.json({
      message: `Brand '${existingBrand.name}' successfully destroy`,
    });
  } catch (error) {
    return res.json({ message: error.message });
  }
};
