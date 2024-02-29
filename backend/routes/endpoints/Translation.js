const {
  createTranslation,
  detectLanguage,
} = require("../../controllers/translation-controller");

let routes = (app) => {
  app.post("/translate", createTranslation);
  app.post("/detect", detectLanguage);
};

module.exports = routes;
