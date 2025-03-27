// Import 'Router' class from the express module to create modular route handlers
import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  addNewProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller";

// Initialize a router instance to use with 'products' routes
const router = Router();

// GET HTTP route for retrieving all of the products from the db
router.get("/", getAllProducts);

// GET HTTP route for getting a single product from the db
router.get("/:productId", getProductById);

// POST HTTP route for creating a new product to the db
router.post("/", addNewProduct);

// PUT HTTP route for updating a product
router.put("/:productId", updateProduct);

// DELETE HTTP route for deleting a product
router.delete("/:productId", deleteProduct);

export default router;
