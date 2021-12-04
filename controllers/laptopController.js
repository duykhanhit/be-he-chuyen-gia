const asyncHandle = require("../middlewares/asyncHandle");
const Laptop = require("../models/Laptop");

module.exports = {
  getAll: asyncHandle(async (req, res, next) => {
    const laptop = await Laptop.find(req.query);

    res.json({
      status: true,
      data: laptop,
    });
  }),
  create: asyncHandle(async (req, res, next) => {
    const laptop = await Laptop.create({
      name: req.body.name,
      price: req.body.price,
      CPU: req.body.CPU,
      RAM: req.body.RAM,
      ROM: req.body.ROM,
      screen: req.body.screen,
      card: req.body.card,
      os: req.body.os,
      size: req.body.size,
      avatar: req.body.avatar,
    });

    res.json({
      status: true,
      data: laptop,
    });
  }),
};
