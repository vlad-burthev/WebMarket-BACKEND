import ApiError from "../error/ApiError.js";
import { decodeToken } from "../helpers/decodeToken.js";
import { Rating } from "../models/models.js";

export const addRating = async (req, res, next) => {
  try {
    // Extract the rate from the request body
    const { rate } = req.body;

    // Extract the device ID from the request parameters
    const { id: deviceId } = req.params;

    // Get the user's token from the request headers
    const token = req.headers.authorization;

    // Decode the user's token
    const user = decodeToken(token);

    const existingRate = await Rating.findOne({
      where: { userId: user.id, deviceId },
    });

    if (existingRate) {
      try {
        await Rating.update(
          { rate }, // Update the rate field
          { where: { userId: user.id, deviceId } } // Condition to identify the rating to update
        );

        return res.status(200).json({
          message: "Rating updated successfully.",
        });
      } catch (error) {
        return next(ApiError.badRequest(error.message));
      }
    }

    // Create a new rating for the device
    await Rating.create({
      rate,
      deviceId,
      userId: user.id,
    });

    return res.status(200).json({ message: "Rating updated successfully." });
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};

export const getDeviceRating = async (req, res, next) => {
  try {
    const { id: deviceId } = req.params;
    const deviceRating = await Rating.findAll({ where: { deviceId } });
    return res.status(200).json(deviceRating);
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};
