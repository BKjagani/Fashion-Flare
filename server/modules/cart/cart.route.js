import express from "express";
import {
  postCart,
  getCart,
  updateQuantity,
  deleteProduct,
} from "./cart.controller.js";

const router = express.Router();

// Get all cart items for a specific user by email
router.get("/cart/:email", getCart);

// Add a product to the cart
router.post("/cart", postCart);

// Update the quantity of a specific cart item by ID
router.put("/cart/update-quantity/:id", updateQuantity);

// Delete a cart item by ID
router.delete("/cart/:id", deleteProduct);

export default router;
