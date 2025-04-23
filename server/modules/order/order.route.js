import express from "express";
import {
  getOrdersByUserEmail,
  getAllOrders,
  updateOrder,
  deleteOrder,
} from "./order.controller.js";

const router = express.Router();

router.get("/user/:userEmail", getOrdersByUserEmail);
router.get("/", getAllOrders);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;
