const express = require("express");
const cauhinhController = require("../controllers/cauhinhController");

const router = express.Router();

router.get("/cauhinh", cauhinhController.getByKey);
router.get("/cauhinhs", cauhinhController.getAll);
router
  .route("/cauhinhs/:key")
  .get(cauhinhController.getOne)
  .put(cauhinhController.update);
router.post("/cauhinhs", cauhinhController.create);

module.exports = router;
