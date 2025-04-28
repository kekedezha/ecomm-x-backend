// Import 'Router' class from the express module to create modular route handlers
import { Router } from "express";
import {
  getUsersCurrentCart,
  addProductToCart,
  updateProductQty,
  deleteProdFromCart,
  clearCart,
} from "../controllers/carts.controller";
import { authenticateToken, isSameUser } from "../middleware/auth";
import { isValidProduct } from "../middleware/cart.middleware";

// Initialize a router instance to use with 'carts' routes
const router = Router();

// GET HTTP route for retrieving users cart
router.get("/:userId", authenticateToken, isSameUser, getUsersCurrentCart);

// POST HTTP route for adding a product to the cart
router.post(
  "/:userId",
  authenticateToken,
  isSameUser,
  isValidProduct,
  addProductToCart
);

// PUT HTTP route for updating quantity of a product in the cart
router.put(
  "/:userId/:productId",
  authenticateToken,
  isSameUser,
  updateProductQty
);

// DELETE HTTP route for removing individual items from cart
router.delete(
  "/:userId/:productId",
  authenticateToken,
  isSameUser,
  deleteProdFromCart
);

// DELETE HTTP route for clearing cart
router.delete("/:userId", authenticateToken, isSameUser, clearCart);

export default router;
