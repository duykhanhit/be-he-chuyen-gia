const express = require("express");
const handleController = require("../controllers/handleController");

const router = express.Router();

router.post("/tu-van", handleController.advise);

module.exports = router;
