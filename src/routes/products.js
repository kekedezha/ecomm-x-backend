// Import 'Router' class from the express module to create modular route handlers
import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  addNewProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller";
import { authenticateToken, authorizeRoles } from "../middleware/auth";

// Initialize a router instance to use with 'products' routes
const router = Router();

// GET HTTP route for retrieving all of the products from the db
router.get("/", getAllProducts);

// GET HTTP route for getting a single product from the db
router.get("/:productId", getProductById);

// POST HTTP route for creating a new product to the db
router.post(
  "/admin",
  authenticateToken,
  authorizeRoles("admin"),
  addNewProduct
);

// PUT HTTP route for updating a product
router.put(
  "/admin/:productId",
  authenticateToken,
  authorizeRoles("admin"),
  updateProduct
);

// DELETE HTTP route for deleting a product
router.delete(
  "/admin/:productId",
  authenticateToken,
  authorizeRoles("admin"),
  deleteProduct
);

export default router;
