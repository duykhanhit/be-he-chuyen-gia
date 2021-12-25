const express = require("express");
const handleController = require("../controllers/handleController");

const router = express.Router();

router.post("/tu-van", handleController.advise);
router.get("/remove-redundant-rule", handleController.removeRedundantRule);

module.exports = router;
