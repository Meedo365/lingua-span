const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema(
  {
    translationId: {
      type: mongoose.Types.ObjectId,
      ref: "translation",
      required: true,
    },
    rating: {
      type: Number,
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

const Rating = mongoose.model("ratings", ratingSchema);

module.exports = Rating;
