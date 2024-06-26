const express = require("express");
const router = express.Router();
const { statusCheck } = require("../controllers/cronCycles");

router.post("/statusCheck", statusCheck);
module.exports = router;
