// Import 'Router' class from the express module to create modular route handlers
import { Router } from "express";
import {
  getAllCategories,
  getProdsByCategory,
  createNewCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.controller";

// Initialize a router instance to use with 'categories' routes
const router = Router();

// GET HTTP route for retrieving all of the categories from the db
router.get("/", getAllCategories);

// GET HTTP route for getting a single category from the db
router.get("/:categoryId/products", getProdsByCategory);

// POST HTTP route for creating a new category to the db
router.post("/", createNewCategory);

// PUT HTTP route for updating a category
router.put("/:categoryId", updateCategory);

// DELETE HTTP route for deleting a category
router.delete("/:categoryId", deleteCategory);

export default router;
