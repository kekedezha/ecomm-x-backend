// Import 'Router' class from the express module to create modular route handlers
import { Router } from "express";
import {
  getAllUserOrders,
  getOrderForUser,
  createOrder,
  updateOrderStatus,
  deleteUserOrder,
} from "../controllers/orders.controller";

// Initialize a router instance to use with 'orders' routes
const router = Router();

// GET HTTP route for retrieving all of the orders for specified user
router.get("/:userId", getAllUserOrders);

// GET HTTP route for getting a specified order for a specified user
router.get("/:userId/:orderId", getOrderForUser);

// POST HTTP route for creating an order from the cart
router.post("/:userId", createOrder);

// PUT HTTP route for updating order status
router.put("/:userId/:orderId", updateOrderStatus);

// DELETE HTTP route for deleting/canceling an order
router.delete("/:userId/:orderId", deleteUserOrder);

export default router;
