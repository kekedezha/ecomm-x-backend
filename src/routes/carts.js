// Import 'Router' class from the express module to create modular route handlers
import { Router } from "express";
import {
  getUsersCurrentCart,
  addProductToCart,
  updateProductQty,
  deleteProdFromCart,
  clearCart,
} from "../controllers/carts.controller";
import { authenticateToken, isSameUser } from "../middleware/auth";
import { isValidProduct } from "../middleware/cart.middleware";

// Initialize a router instance to use with 'carts' routes
const router = Router();

/**
 * @swagger
 * /carts/{userId}:
 *  get:
 *    summary: Get the users cart
 *    tags: [Carts]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - $ref: '#/components/parameters/UserIdParam'
 *    responses:
 *      200:
 *        description: Successfully retrieved users' cart
 *        content:
 *          application:/json:
 *            schema:
 *              $ref: '#/components/schemas/CartItems'
 *      401:
 *        description: Missing token or user is trying to access an order that does not belong to them.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                error: "'Missing token.' OR 'User is not authorized to view user information that is not one's self.'"
 *      403:
 *        description: Invalid token.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                error: Invalid token.
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/InternalServerError'
 */
router.get("/:userId", authenticateToken, isSameUser, getUsersCurrentCart);

/**
 * @swagger
 * /carts/{userId}:
 *  post:
 *    summary: Add product to users' cart
 *    tags: [Carts]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - $ref: '#/components/parameters/UserIdParam'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/NewCartItem'
 *    responses:
 *      201:
 *        description: Successfully added product to users' cart
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/NewCartItemsResponse'
 *      400:
 *        description: Bad Request.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                error: Bad Request. No product id given.
 *      401:
 *        description: Missing token or user is trying to access an order that does not belong to them.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                error: "'Missing token.' OR 'User is not authorized to view user information that is not one's self.'"
 *      403:
 *        description: Invalid token.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                error: Invalid token.
 *      404:
 *        description: Not found.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                error: Product does not exist.
 *
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/InternalServerError'
 */
router.post(
  "/:userId",
  authenticateToken,
  isSameUser,
  isValidProduct,
  addProductToCart
);

/**
 * @swagger
 * /carts/{userId}/{productId}:
 *  put:
 *    summary: Update a product's quantity in the users' cart
 *    tags: [Carts]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - $ref: '#/components/parameters/ProductIdParam'
 *      - $ref: '#/components/parameters/UserIdParam'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required: true
 *            example:
 *              quantity: 5
 *    responses:
 *      200:
 *        description: Successfully updated product from users' cart
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UpdatedCart'
 *      400:
 *        description: Bad Request.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                error: Bad Request. Not a valid product.
 *      401:
 *        description: Missing token or user is trying to access an order that does not belong to them.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                error: "'Missing token.' OR 'User is not authorized to view user information that is not one's self.'"
 *      403:
 *        description: Invalid token.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                error: Invalid token.
 *      404:
 *        description: Not found.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                error: Product not in cart.
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/InternalServerError'
 */
router.put(
  "/:userId/:productId",
  authenticateToken,
  isSameUser,
  updateProductQty
);

/**
 * @swagger
 * /carts/{userId}/{productId}:
 *  delete:
 *    summary: Delete a product from the users cart
 *    tags: [Carts]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - $ref: '#/components/parameters/ProductIdParam'
 *      - $ref: '#/components/parameters/UserIdParam'
 *    responses:
 *      200:
 *        description: Successfully deleted product from users' cart
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DeletedItemFromCart'
 *      400:
 *        description: Bad Request.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                error: Bad Request. Not a valid product.
 *      401:
 *        description: Missing token or user is trying to access an order that does not belong to them.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                error: "'Missing token.' OR 'User is not authorized to view user information that is not one's self.'"
 *      403:
 *        description: Invalid token.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                error: Invalid token.
 *      404:
 *        description: Not found.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                error: Product not in cart.
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/InternalServerError'
 */
router.delete(
  "/:userId/:productId",
  authenticateToken,
  isSameUser,
  deleteProdFromCart
);

/**
 * @swagger
 * /carts/{userId}:
 *  delete:
 *    summary: Clear the users' cart
 *    tags: [Carts]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - $ref: '#/components/parameters/UserIdParam'
 *    responses:
 *      200:
 *        description: Successfully cleared users' cart
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ClearCart'
 *      401:
 *        description: Missing token or user is trying to access an order that does not belong to them.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                error: "'Missing token.' OR 'User is not authorized to view user information that is not one's self.'"
 *      403:
 *        description: Invalid token.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                error: Invalid token.
 *      404:
 *        description: Not found.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                error: No products in cart to delete.
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/InternalServerError'
 */
router.delete("/:userId", authenticateToken, isSameUser, clearCart);

export default router;
