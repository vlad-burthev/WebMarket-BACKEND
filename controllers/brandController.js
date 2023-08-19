import { Brand } from "../models/models.js";

export const createBrand = async (req, res, next) => {
  try {
    const { name } = req.body;

    const existingBrand = await Brand.findOne({ where: { name } });
    if (existingBrand) {
      return res.json({ message: "Such Brand already exists!" });
    }

    const createBrand = await Brand.create({ name });
    return res.status(200).json(createBrand);
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};

export const getBrands = async (req, res, next) => {
  try {
    const allBrands = await Brand.findAll();
    return res.status(200).json(allBrands);
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};

export const deleteBrand = async (req, res, next) => {
  try {
    const { name } = req.body;
    const existingBrand = await Brand.findOne({ where: { name } });
    if (!existingBrand) {
      return next(ApiError.badRequest("Such brand doesn't exist!"));
    }
    existingBrand.destroy();

    return res.status(204).json({
      message: `Brand '${existingBrand.name}' successfully destroy`,
    });
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};
