// Import 'Router' class from the express module to create modular route handlers
import { Router } from "express";

// Initialize a router instance to use with 'cart_items' routes
const router = Router();

// GET HTTP route for retrieving all of the cart-items from the db
router.get("/", (req, res) => {
  return res.send("General GET HTTP method on cart-items resource");
});

// GET HTTP route for getting a single cart-item from the db
router.get("/:cartItemId", (req, res) => {
  return res.send(
    `GET HTTP method on cart-item resource for cart-items/${req.params.cartItemId}`
  );
});

// POST HTTP route for creating a new cart-item to the db
router.post("/", (req, res) => {
  return res.send("POST HTTP method on cart-items resource");
});

// PUT HTTP route for updating a cart-items info
router.put("/:cartItemId", (req, res) => {
  return res.send(
    `PUT HTTP method on cart-items resource for cart-items/${req.params.cartItemId}`
  );
});

// DELETE HTTP route for deleting a cart-item
router.delete("/:cartItemId", (req, res) => {
  return res.send(
    `DELETE HTTP method on cart-items resource for cart-items/${req.params.cartItemId}`
  );
});

export default router;
