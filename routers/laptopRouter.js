const express = require("express");
const laptopController = require("../controllers/laptopController");

const router = express.Router();

router
  .route("/laptops")
  .get(laptopController.getAll)
  .post(laptopController.create);

module.exports = router;
