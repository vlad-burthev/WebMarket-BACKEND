import { Type } from "../models/models.js";

export const createType = async (req, res, next) => {
  try {
    const { name } = req.body;

    const existingType = await Type.findOne({ where: { name } });
    if (existingType) {
      return res.json({ message: "Such type already exists!" });
    }

    const createType = await Type.create({ name });
    return res.status(200).json(createType);
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};

export const getTypes = async (req, res, next) => {
  try {
    const allTypes = await Type.findAll();
    return res.status(200).json(allTypes);
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};

export const deleteType = async (req, res, next) => {
  try {
    const { name } = req.body;
    const existingType = await Type.findOne({ where: { name } });
    if (!existingType) {
      return next(ApiError.badRequest("Such type doesn't exist!"));
    }
    existingType.destroy();

    return res.status(200).json({
      message: `Type '${existingType.name}' successfully destroy`,
    });
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};
