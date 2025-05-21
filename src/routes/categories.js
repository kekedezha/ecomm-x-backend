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
 *    responses:
 *      200:
 *        description: A list of categories
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AllCategories'
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/InternalServerError'
 *
 */
router.get("/", getAllCategories);

/**
 * @swagger
 * /categories/{categoryId}/products:
 *  get:
 *    summary: Get all products by category id
 *    tags: [Categories]
 *    parameters:
 *      - $ref: '#/components/parameters/CategoryIdParam'
 *    responses:
 *      200:
 *        description: Successfully retrieved products
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetProdsByCategory'
 *      400:
 *        description: Bad request. Invalid category id.
 *        content:
 *          application/json:
 *            schema:
 *            type: object
 *            properties:
 *              error:
 *                type: string
 *                description: The error message
 *            example:
 *              error: Bad Request. Invalid Category ID.
 *      404:
 *        description: Not found.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: The error message.
 *              example:
 *                error: Category not found.
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/InternalServerError'
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
 *    responses:
 *      201:
 *        description: Successfully created new product
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/NewCategory'
 *      400:
 *        description: Bad request. Missing category name.
 *        content:
 *          application/json:
 *            schema:
 *            type: object
 *            properties:
 *              error:
 *                type: string
 *                description: The error message
 *            example:
 *              error: Bad Request. Missing category name.
 *      401:
 *         description: Missing token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MissingToken'
 *      403:
 *        description: >
 *          Unauthorized. Possible reasons:
 *           - The user has send over an invalid token.
 *           - The user is trying to access a admin path and does not have admin privileges.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Unauthorized'
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/InternalServerError'
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
 *    parameters:
 *      - $ref: '#/components/parameters/CategoryIdParam'
 *    responses:
 *      200:
 *        description: Successfully updated product
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UpdateCategory'
 *      400:
 *        description: >
 *          Bad request. Possible reasons:
 *            - Invalid category id
 *            - Missing update
 *        content:
 *          application/json:
 *            schema:
 *            type: object
 *            properties:
 *              error:
 *                type: string
 *                description: The error message
 *            example:
 *              error: "'Bad Request. Invalid Category ID.' OR 'Bad Request. Missing update.'"
 *      401:
 *         description: Missing token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MissingToken'
 *      403:
 *        description: >
 *          Unauthorized. Possible reasons:
 *           - The user has send over an invalid token.
 *           - The user is trying to access a admin path and does not have admin privileges.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Unauthorized'
 *      404:
 *        description: Not found.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              description: The error message
 *            example:
 *              error: Category not found.
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/InternalServerError'
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
 *    parameters:
 *      - $ref: '#/components/parameters/CategoryIdParam'
 *    responses:
 *      200:
 *        description: Successfully deleted product
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UpdateCategory'
 *      400:
 *        description: Bad Request.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              description: The error message
 *            example:
 *              error: Bad Request. Invalid Category ID.
 *      401:
 *         description: Missing token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MissingToken'
 *      403:
 *        description: >
 *          Unauthorized. Possible reasons:
 *           - The user has send over an invalid token.
 *           - The user is trying to access a admin path and does not have admin privileges.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Unauthorized'
 *      404:
 *        description: Not found.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              description: The error message
 *            example:
 *              error: Category not found.
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/InternalServerError'
 *
 */
router.delete(
  "/admin/:categoryId",
  authenticateToken,
  authorizeRoles("admin"),
  deleteCategory
);

export default router;
