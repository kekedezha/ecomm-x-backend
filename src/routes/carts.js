// Import 'Router' class from the express module to create modular route handlers
import { Router } from "express";
import {
  getUsersCurrentCart,
  addProductToCart,
  updateProductQty,
  deleteProdFromCart,
  clearCart,
} from "../controllers/carts.controller";

// Initialize a router instance to use with 'carts' routes
const router = Router();

// GET HTTP route for retrieving users cart
router.get("/:userId", getUsersCurrentCart);

// POST HTTP route for adding a product to the cart
router.post("/:userId", addProductToCart);

// PUT HTTP route for updating quantity of a product in the cart
router.put("/:userId/:productId", updateProductQty);

// DELETE HTTP route for removing individual items from cart
router.delete("/:userId/:productId", deleteProdFromCart);

// DELETE HTTP route for clearing cart
router.delete("/:userId", clearCart);

export default router;
