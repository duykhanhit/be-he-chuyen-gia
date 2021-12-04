const mongoose = require("mongoose");

const CauHinhSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: [true, "Key is invalid."],
      unique: true,
    },
    value: {
      type: String,
      required: [true, "Value is invalid."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cauhinh", CauHinhSchema);
