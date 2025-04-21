import express from "express";
import {
  postProduct,
  getProduct,
  getOneProduct,
  getProductByCategory,
  updateProduct,
  deleteProduct,
} from "./product.controller.js";
const router = express.Router();

router.get("/products", getProduct);

router.get("/products/:id", getOneProduct);

router.get("/products/category/:categoryName", getProductByCategory);

router.post("/products", postProduct);

router.put("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);

export default router;
