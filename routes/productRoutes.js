const express = require("express");
const multer = require("multer");
const { protect } = require("../middlewares/authMiddleware");
const productController = require("../controllers/productController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", protect, upload.single("image"), productController.create);
router.get("/", productController.getAll);
router.get("/:id", productController.getOne);
router.put("/:id", protect, productController.update);
router.delete("/:id", protect, productController.remove);

module.exports = router;
