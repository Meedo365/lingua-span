const { successHandler } = require("../utils/core");
const { errorHandler } = require("../utils/errorHandler");
const Translation = require("../models/translation");
const genKey =
  process.env.GEMINI_KEY || "AIzaSyCs0-SE8g2XJmqEgBPZJr8RCMC0o0WdusI";
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(genKey);

const routes = {
  createTranslation: async (req, res) => {
    try {
      let { text, targetLanguage, inputLanguage } = req.body;
      // Check if required fields are provided
      if (!text || !targetLanguage) {
        return errorHandler(
          res,
          "Text not provided or target language unspecified.",
          400
        );
      }
      if (!inputLanguage) {
        inputLanguage = "English";
      }
      const prompt = `Translate ${text} from ${inputLanguage} to ${targetLanguage}`;

      let translation = await askGemini(prompt);
      if (translation === null) {
        return errorHandler(
          res,
          "Translation could not be generated. Try again.",
          500
        );
      }

      // Create new Translation entry
      const newTranslation = new Translation({
        text,
        translation,
        inputLanguage,
        targetLanguage,
      });

      // Save newTranslation
      await newTranslation.save();

      // Send success response
      return successHandler(
        res,
        "Translation Successfully Generated.",
        newTranslation
      );
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode || 500);
    }
  },

  detectLanguage: async (req, res) => {
    try {
      let { sentence } = req.body;
      // Check if required fields are provided
      if (!sentence) {
        return errorHandler(res, "No sentence provided...", 400);
      }
      const prompt = `Detect the language of the provided sentence,"${sentence}" 
      which could be English, Hausa, Igbo, Yoruba, French, Portuguese, or Pidgin.`;

      let language = await askGemini(prompt);
      if (language === null) {
        return errorHandler(
          res,
          "Language could not be detected. Try again.",
          500
        );
      }
      // Send success response
      return successHandler(res, "Language Successfully Detected.", language);
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode || 500);
    }
  },
};

const createTranslation = routes.createTranslation;
const detectLanguage = routes.detectLanguage;

module.exports = {
  createTranslation,
  detectLanguage,
};

async function askGemini(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const _response = await result.response;
    const response = _response.text();
    return response;
  } catch (err) {
    return null;
  }
}
