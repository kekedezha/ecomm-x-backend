// Import 'Router' class from the express module to create modular route handlers
import { Router } from "express";

// Initialize a router instance to use with 'products' routes
const router = Router();

// GET HTTP route for retrieving all of the products from the db
router.get("/", (req, res) => {
  return res.send("General GET HTTP method on products resource");
});

// GET HTTP route for getting a single product from the db
router.get("/:productId", (req, res) => {
  return res.send(
    `GET HTTP method on products resource for products/${req.params.productId}`
  );
});

// POST HTTP route for creating a new product to the db
router.post("/", (req, res) => {
  return res.send("POST HTTP method on products resource");
});

// PUT HTTP route for updating a product info
router.put("/:productId", (req, res) => {
  return res.send(
    `PUT HTTP method on products resource for products/${req.params.productId}`
  );
});

// DELETE HTTP route for deleting a product
router.delete("/:productId", (req, res) => {
  return res.send(
    `DELETE HTTP method on products resource for products/${req.params.productId}`
  );
});

export default router;
