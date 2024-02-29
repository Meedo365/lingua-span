const mongoose = require("mongoose");

const translationSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    inputLanguage: {
      type: String,
      default: "english",
    },
    targetLanguage: {
      type: String,
      required: true,
    },
    translation: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id?.toString();
        delete ret.__v;
        delete ret._id;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

const Translation = mongoose.model("translation", translationSchema);

module.exports = Translation;
