const asyncHandle = require("../middlewares/asyncHandle");
const CauHinh = require("../models/CauHinh");

module.exports = {
  getByKey: asyncHandle(async (req, res) => {
    const { key } = req.query;

    const cauhinh = await CauHinh.find({
      key: {
        $regex: `^${key}`,
      },
    });

    res.json({
      status: true,
      data: cauhinh,
    });
  }),

  getAll: asyncHandle(async (req, res) => {
    const cauhinh = await CauHinh.find();

    res.json({
      status: true,
      data: cauhinh,
    });
  }),

  getOne: asyncHandle(async (req, res) => {
    const { key } = req.params;

    const cauhinh = await CauHinh.findOne({ key });

    res.json({
      status: true,
      data: cauhinh,
    });
  }),

  update: asyncHandle(async (req, res) => {
    const { key } = req.params;

    const cauhinh = await CauHinh.findOne({ key });

    const newCauhinh = await CauHinh.findByIdAndUpdate(cauhinh._id, req.body, {
      new: true,
    });

    res.json({
      status: true,
      data: newCauhinh,
    });
  }),

  create: asyncHandle(async (req, res) => {
    const cauhinh = await CauHinh.create({
      key: req.body.key,
      value: req.body.value,
    });

    res.json({
      status: true,
      data: cauhinh,
    });
  }),
};
