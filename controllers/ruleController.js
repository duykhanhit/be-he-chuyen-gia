const asyncHandle = require("../middlewares/asyncHandle");
const Rule = require("../models/Rule");

module.exports = {
  getAll: asyncHandle(async (req, res) => {
    const rules = await Rule.find(req.query);

    res.json({
      status: true,
      data: rules,
    });
  }),

  getOne: asyncHandle(async (req, res) => {
    const rule = await Rule.findOne({ key: req.params.key });

    res.json({
      status: true,
      data: rule,
    });
  }),

  delete: asyncHandle(async (req, res) => {
    const rule = await Rule.findOne({ key: req.params.key });

    if (!rule) {
      return next(new ErrorResponse(404, `Cannot delete rule`));
    }

    await Rule.findByIdAndDelete(rule._id);

    res.json({
      status: true,
      data: {},
    });
  }),

  deleteRedundant: asyncHandle(async (req, res) => {
    const rule = await Rule.find({
      key: {
        $in: req.body.rules,
      },
    });

    if (!rule.length) {
      return next(new ErrorResponse(404, `Cannot delete rule`));
    }

    await Rule.deleteMany({
      key: {
        $in: req.body.rules,
      },
    });

    res.json({
      status: true,
      data: {},
    });
  }),

  create: asyncHandle(async (req, res) => {
    const rule = await Rule.create({
      key: req.body.key,
      vetrai: req.body.vetrai,
      vephai: req.body.vephai,
    });

    res.json({
      status: true,
      data: rule,
    });
  }),

  update: asyncHandle(async (req, res) => {
    const rule = await Rule.findOne({ key: req.params.key });

    if (!rule) {
      return next(new ErrorResponse(404, `Cannot delete rule`));
    }

    const newRule = await Rule.findByIdAndUpdate(rule._id, req.body, {
      new: true,
    });

    res.json({
      status: true,
      data: newRule,
    });
  }),
};
