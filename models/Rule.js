const mongoose = require("mongoose");

const RuleSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: [true, "Key is invalid."],
      unique: true,
    },
    vetrai: {
      type: String,
      required: [true, "Value is invalid."],
    },
    vephai: {
      type: String,
      required: [true, "Value is invalid."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("rule", RuleSchema);
