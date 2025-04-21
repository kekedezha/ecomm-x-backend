// Import 'Router' class from the express module to create modular route handlers
import { Router } from "express";
import { finalizeOrder } from "../controllers/checkout.controller";

// Initialize a router instance to use with 'carts' routes
const router = Router();

// POST HTTP route to process a payment and finalize an order
router.post("/:userId", finalizeOrder);
