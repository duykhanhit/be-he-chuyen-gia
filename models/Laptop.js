const mongoose = require("mongoose");

const LaptopSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: [true, "Key is invalid."],
    },
    name: {
      type: String,
      required: [true, "Name is invalid."],
    },
    price: {
      type: Number,
      required: [true, "Price is invalid."],
    },
    CPU: {
      type: String,
      required: [true, "CPU is invalid."],
    },
    RAM: {
      type: String,
      required: [true, "RAM is invalid."],
    },
    ROM: {
      type: String,
      required: [true, "ROM is invalid."],
    },
    screen: {
      type: String,
      required: [true, "Screen is invalid."],
    },
    card: {
      type: String,
      required: [true, "Card is invalid."],
    },
    os: {
      type: String,
      required: [true, "Os is invalid."],
    },
    size: {
      type: String,
      required: [true, "Size is invalid."],
    },
    avatar: {
      type: String,
      required: [true, "Avatar is invalid."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("laptop", LaptopSchema);
