const { createRating } = require("../../controllers/rating-controller");

let routes = (app) => {
  app.post("/rate", createRating);
};

module.exports = routes;
