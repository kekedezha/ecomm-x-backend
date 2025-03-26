// Import 'Router' class from the express module to create modular route handlers
import { Router } from "express";

// Initialize a router instance to use with 'payments' routes
const router = Router();

// GET HTTP route for retrieving all of the payments from the db
router.get("/", (req, res) => {
  return res.send("General GET HTTP method on payments resource");
});

// GET HTTP route for getting a single payment from the db
router.get("/:paymentId", (req, res) => {
  return res.send(
    `GET HTTP method on payments resource for payments/${req.params.paymentId}`
  );
});

// POST HTTP route for creating a new payment to the db
router.post("/", (req, res) => {
  return res.status(201).send("POST HTTP method on payments resource");
});

// PUT HTTP route for updating payment info
router.put("/:paymentId", (req, res) => {
  return res.send(
    `PUT HTTP method on payments resource for payments/${req.params.paymentId}`
  );
});

// DELETE HTTP route for deleting a payment
router.delete("/:paymentId", (req, res) => {
  return res.send(
    `DELETE HTTP method on payments resource for payments/${req.params.paymentId}`
  );
});

export default router;
