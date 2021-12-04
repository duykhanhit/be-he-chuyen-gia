const express = require("express");
const ruleController = require("../controllers/ruleController");

const router = express.Router();

router.route("/rules").get(ruleController.getAll).post(ruleController.create);

router
  .route("/rules/:key")
  .get(ruleController.getOne)
  .delete(ruleController.delete)
  .put(ruleController.update);

module.exports = router;
