"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _carts = require("../controllers/carts.controller");
var _auth = require("../middleware/auth");
var _cart = require("../middleware/cart.middleware");
// Import 'Router' class from the express module to create modular route handlers

// Initialize a router instance to use with 'carts' routes
const router = (0, _express.Router)();

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
router.get("/:userId", _auth.authenticateToken, _auth.isSameUser, _carts.getUsersCurrentCart);

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
router.post("/:userId", _auth.authenticateToken, _auth.isSameUser, _cart.isValidProduct, _carts.addProductToCart);

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
router.put("/:userId/:productId", _auth.authenticateToken, _auth.isSameUser, _carts.updateProductQty);

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
router.delete("/:userId/:productId", _auth.authenticateToken, _auth.isSameUser, _carts.deleteProdFromCart);

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
router.delete("/:userId", _auth.authenticateToken, _auth.isSameUser, _carts.clearCart);
var _default = exports.default = router;