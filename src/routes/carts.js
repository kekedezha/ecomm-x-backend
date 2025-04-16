// Import 'Router' class from the express module to create modular route handlers
import { Router } from "express";

// Initialize a router instance to use with 'carts' routes
const router = Router();

// GET HTTP route for retrieving users cart
router.get("/:userId");

// POST HTTP route for adding a product to the cart
router.post("/:userId");

// PUT HTTP route for updating quantity of a product in the cart
router.put("/:userId/:productId");

// DELETE HTTP route for removing individual items from cart
router.delete("/:userId/:productId");

// DELETE HTTP route for clearing cart
router.delete("/:userId");

export default router;
