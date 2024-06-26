const express = require("express");
const router = express.Router();
const {
  getAllVaults,
  addVault,
  displayVault,
  updateVault,
  deleteVault,
} = require("../controllers/vaults");

const { verifyToken } = require("../middlewares/authMiddleware");

router.get("/getAllVaults", verifyToken, getAllVaults);
router.post("/addVault", verifyToken, addVault);
router.post("/displayVault", verifyToken, displayVault);
router.put("/updateVault/:vId", verifyToken, updateVault);
router.delete("/deleteVault/:vId", verifyToken, deleteVault);

module.exports = router;
