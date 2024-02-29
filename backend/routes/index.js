const express = require("express");
const app = express.Router();

require("./endpoints/Translation")(app);
require("./endpoints/Rating")(app);

module.exports = app;
