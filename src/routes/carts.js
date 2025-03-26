// Import 'Router' class from the express module to create modular route handlers
import { Router } from "express";

// Initialize a router instance to use with 'carts' routes
const router = Router();

// GET HTTP route for retrieving all of the carts from the db
router.get("/", (req, res) => {
  return res.send("General GET HTTP method on carts resource");
});

// GET HTTP route for getting a single cart from the db
router.get("/:cartId", (req, res) => {
  return res.send(
    `GET HTTP method on carts resource for carts/${req.params.cartId}`
  );
});

// POST HTTP route for creating a new cart to the db
router.post("/", (req, res) => {
  return res.status(201).send("POST HTTP method on carts resource");
});

// PUT HTTP route for updating a cart
router.put("/:cartId", (req, res) => {
  return res.send(
    `PUT HTTP method on carts resource for carts/${req.params.cartId}`
  );
});

// DELETE HTTP route for deleting a cart
router.delete("/:cartId", (req, res) => {
  return res.send(
    `DELETE HTTP method on carts resource for carts/${req.params.cartId}`
  );
});

export default router;
