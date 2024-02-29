const { successHandler } = require("../utils/core");
const { errorHandler } = require("../utils/errorHandler");
const Rating = require("../models/ratings");

const routes = {
  createRating: async (req, res) => {
    try {
      let { id, rating } = req.body;
      // Check if required fields are provided
      if (!id || !rating) {
        return errorHandler(res, "No rating specified", 400);
      }

      // Create new Translation entry
      const newRating = new Rating({
        rating,
        translationId: id,
      });

      // Save newRating
      await newRating.save();

      // Send success response
      return successHandler(
        res,
        `Translation Successfully Rated ${rating} star(s).`,
        newRating
      );
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode || 500);
    }
  },
};

const createRating = routes.createRating;

module.exports = {
  createRating,
};
