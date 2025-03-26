// Import 'Router' class from the express module to create modular route handlers
import { Router } from "express";

// Initialize a router instance to use with 'orders' routes
const router = Router();

// GET HTTP route for retrieving all of the orders from the db
router.get("/", (req, res) => {
  return res.send("General GET HTTP method on orders resource");
});

// GET HTTP route for getting a single order from the db
router.get("/:orderId", (req, res) => {
  return res.send(
    `GET HTTP method on orders resource for orders/${req.params.orderId}`
  );
});

// POST HTTP route for creating a new order to the db
router.post("/", (req, res) => {
  return res.status(201).send("POST HTTP method on orders resource");
});

// PUT HTTP route for updating order
router.put("/:orderId", (req, res) => {
  return res.send(
    `PUT HTTP method on orders resource for orders/${req.params.orderId}`
  );
});

// DELETE HTTP route for deleting an order
router.delete("/:orderId", (req, res) => {
  return res.send(
    `DELETE HTTP method on orders resource for orders/${req.params.orderId}`
  );
});

export default router;
