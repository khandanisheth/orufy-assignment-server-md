import express from "express";
import multer from "multer";
import productController from "../Controllers/productController.js";
import path from "path";
const router = express.Router();

// storage location
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // uploads folder
    },
    filename: function (req, file, cb) {
        cb(
            null,
            Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname)
        );
    },
});

const upload = multer({ storage });
router.post("/add", upload.array("images", 10), productController.createProduct);
router.get("/all", productController.getAll);
router.put("/update/:id", upload.array("images", 5), productController.updateProduct);
router.delete("/delete/:id", productController.deleteProduct);
router.put("/publish/:id", productController.togglePublish);



export default router;
