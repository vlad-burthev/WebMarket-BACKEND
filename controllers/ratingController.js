import { decodeToken } from "../helpers/decodeToken.js";
import { Rating } from "../models/models.js";

export const addRating = async (req, res) => {
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
        const test = await Rating.update(
          { rate }, // Update the rate field
          { where: { userId: user.id, deviceId } } // Condition to identify the rating to update
        );

        return res.json({
          message: "Rating updated successfully." + " " + rate,
        });
      } catch (error) {
        return res.json({
          error: "An error occurred while updating the rating.",
        });
      }
    }

    // Create a new rating for the device
    await Rating.create({
      rate,
      deviceId,
      userId: user.id,
    });

    return res.json({ message: "Rating updated successfully." + " " + rate }); // Return the newly created rating
  } catch (error) {
    return res.json({ error: "An error occurred while adding the rating." });
  }
};

export const getDeviceRating = async (req, res) => {
  try {
    const { id: deviceId } = req.params;
    const deviceRating = await Rating.findAll({ where: { deviceId } });
    return res.json(deviceRating);
  } catch (error) {
    return res.json({ error: error.message });
  }
};
