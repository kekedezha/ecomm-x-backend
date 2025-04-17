// Import 'Router' class from the express module to create modular route handlers
import { Router } from "express";

// Initialize a router instance to use with 'orders' routes
const router = Router();

// GET HTTP route for retrieving all of the orders for specified user
router.get("/:userId");

// GET HTTP route for getting a specified order for a specified user
router.get("/:userId/:orderId");

// POST HTTP route for creating an order from the cart
router.post("/:userId");

// PUT HTTP route for updating order status
router.put("/:userId/:orderId");

// DELETE HTTP route for deleting/canceling an order
router.delete("/:userId/:orderId");

export default router;
