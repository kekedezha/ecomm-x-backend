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

/**
 * @swagger
 * /categories:
 *  get:
 *    summary: Get all categories
 *    tags: [Categories]
 *
 */
router.get("/", getAllCategories);

/**
 * @swagger
 * /categories/{categoryId}/products:
 *  get:
 *    summary: Get all products by category id
 *    tags: [Categories]
 *
 */
router.get("/:categoryId/products", getProdsByCategory);

/**
 * @swagger
 * /categories/admin:
 *  post:
 *    summary: Add new category to db -- ADMIN ONLY
 *    tags: [Categories]
 *    security:
 *      - bearerAuth: []
 *
 */
router.post(
  "/admin",
  authenticateToken,
  authorizeRoles("admin"),
  createNewCategory
);

/**
 * @swagger
 * /categories/admin/{categoryId}/:
 *  put:
 *    summary: Update category by category id -- ADMIN ONLY
 *    tags: [Categories]
 *    security:
 *      - bearerAuth: []
 */
router.put(
  "/admin/:categoryId",
  authenticateToken,
  authorizeRoles("admin"),
  updateCategory
);

/**
 * @swagger
 * /categories/admin/{categoryId}/:
 *  delete:
 *    summary: Delete category by category id -- ADMIN ONLY
 *    tags: [Categories]
 *    security:
 *      - bearerAuth: []
 *
 */
router.delete(
  "/admin/:categoryId",
  authenticateToken,
  authorizeRoles("admin"),
  deleteCategory
);

export default router;
