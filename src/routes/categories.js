// Import 'Router' class from the express module to create modular route handlers
import { Router } from "express";
import {
  getAllCategories,
  getProdsByCategory,
  createNewCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.controller";
import { authenticateToken, authorizeRoles } from "../middleware/auth";

// Initialize a router instance to use with 'categories' routes
const router = Router();

// GET HTTP route for retrieving all of the categories from the db
router.get("/", getAllCategories);

// GET HTTP route for getting a single category from the db
router.get("/:categoryId/products", getProdsByCategory);

// POST HTTP route for creating a new category -- ADMIN ONLY
router.post(
  "/admin",
  authenticateToken,
  authorizeRoles("admin"),
  createNewCategory
);

// PUT HTTP route for updating a category -- ADMIN ONLY
router.put(
  "/admin/:categoryId",
  authenticateToken,
  authorizeRoles("admin"),
  updateCategory
);

// DELETE HTTP route for deleting a category -- ADMIN ONLY
router.delete(
  "/admin/:categoryId",
  authenticateToken,
  authorizeRoles("admin"),
  deleteCategory
);

export default router;
