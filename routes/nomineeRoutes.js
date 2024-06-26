const express = require("express");
const router = express.Router();
const { email, otpVerify, vaultData } = require("../controllers/nominee");

router.post("/email", email);
router.post("/otpVerify", otpVerify);
router.post("/vaultData", vaultData);

module.exports = router;
