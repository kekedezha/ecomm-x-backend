// Import 'Router' class from the express module to create modular route handlers
import { Router } from "express";

// Initialize a router instance to use with 'order_items' routes
const router = Router();

// GET HTTP route for retrieving all of the order_items from the db
router.get("/", (req, res) => {
  return res.send("General GET HTTP method on order-items resource");
});

// GET HTTP route for getting a single oder-items from the db
router.get("/:orderItemId", (req, res) => {
  return res.send(
    `GET HTTP method on order-items resource for order-items/${req.params.orderItemId}`
  );
});

// POST HTTP route for creating a new order-item to the db
router.post("/", (req, res) => {
  return res.status(201).send("POST HTTP method on order-items resource");
});

// PUT HTTP route for updating an order-items info
router.put("/:orderItemId", (req, res) => {
  return res.send(
    `PUT HTTP method on order-items resource for order-items/${req.params.orderItemId}`
  );
});

// DELETE HTTP route for deleting an order-items
router.delete("/:orderItemId", (req, res) => {
  return res.send(
    `DELETE HTTP method on order-items resource for order-items/${req.params.orderItemId}`
  );
});

export default router;
