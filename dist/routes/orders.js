"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _orders = require("../controllers/orders.controller");
var _auth = require("../middleware/auth");
var _orders2 = require("../middleware/orders.middleware");
// Import 'Router' class from the express module to create modular route handlers

// Initialize a router instance to use with 'orders' routes
const router = (0, _express.Router)();

/**
 * @swagger
 * /orders/admin:
 *  get:
 *    summary: Get all orders -- ADMIN ONLY
 *    tags: [Orders]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: A list of orders
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AllOrders'
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
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 */
router.get("/admin", _auth.authenticateToken, (0, _auth.authorizeRoles)("admin"), _orders.getAllOrders);

/**
 * @swagger
 * /orders/{userId}:
 *  get:
 *    summary: Get all orders for specified user
 *    tags: [Orders]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - $ref: '#/components/parameters/UserIdParam'
 *    responses:
 *      200:
 *        description: A list of the users' orders
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AllUserOrders'
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
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 */
router.get("/:userId", _auth.authenticateToken, _auth.isSameUser, _orders.getAllUserOrders);

/**
 * @swagger
 * /orders/{userId}/{orderId}:
 *  get:
 *    summary: Get a specific order for specified user
 *    tags: [Orders]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - $ref: '#/components/parameters/UserIdParam'
 *      - $ref: '#/components/parameters/OrderIdParam'
 *    responses:
 *      200:
 *        description: Successful order retrieval for user
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                id: 52
 *                user_id: 2
 *                total_price: 18.96
 *                status: "PAID"
 *                created_at: "2025-05-07 15:55:51.790103"
 *      400:
 *        description: Bad Request.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                error: Bad Request. Not a valid order.
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
 *                error: Order does not exist for user.
 *      500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 */
router.get("/:userId/:orderId", _auth.authenticateToken, _auth.isSameUser, _orders.getOrderForUser);

/**
 * @swagger
 * /orders/{userId}:
 *  post:
 *    summary: Create new order from cart
 *    tags: [Orders]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - $ref: '#/components/parameters/UserIdParam'
 *    responses:
 *      201:
 *        description: Successfully submitted order
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                message: Successfully submitted order and is awaiting to begin being processed.
 *                order_id: 403
 *                total_price: 20.75
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
 *                error: Cart is empty.
 *      500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 */
router.post("/:userId", _auth.authenticateToken, _auth.isSameUser, _orders.createOrderFromCart);

/**
 * @swagger
 * /orders/admin/{userId}/{orderId}:
 *  put:
 *    summary: Update the specified order for the specified user -- ADMIN ONLY
 *    tags: [Orders]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - $ref: '#/components/parameters/UserIdParam'
 *      - $ref: '#/components/parameters/OrderIdParam'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            example:
 *              statusUpdate: READY FOR PICK-UP
 *    responses:
 *      200:
 *        description: Successful order update
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UpdatedOrder'
 *      400:
 *        description: >
 *          Bad Request. Possible reasons:
 *            - Invalid order id
 *            - Invalid status
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                error: "'Bad Request. Invalid Order ID' OR 'Bad Request. Invalid status.'"
 *      401:
 *        description: Missing token.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MissingToken'
 *      403:
 *        description: >
 *          Unauthorized. Possible reasons:
 *            - The user has send over an invalid token.
 *            - The user is trying to access a admin path and does not have admin privileges.
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
 *              example:
 *                error: Order not found.
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/InternalServerError'
 */
router.put("/admin/:userId/:orderId", _auth.authenticateToken, (0, _auth.authorizeRoles)("admin"), _orders2.checkIfUserExists, _orders.updateOrderStatus);

/**
 * @swagger
 * /orders/admin/{orderId}:
 *  delete:
 *    summary: Delete the specified order -- ADMIN ONLY
 *    tags: [Orders]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - $ref: '#/components/parameters/OrderIdParam'
 *    responses:
 *      200:
 *        description: Successfully deleted order.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DeletedOrder'
 *      400:
 *        description: Bad Request.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                error: Bad Request. Invalid Order ID.
 *      401:
 *        description: Missing token.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MissingToken'
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
 *              example:
 *                error: Order not found.
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/InternalServerError'
 */
router.delete("/admin/:orderId", _auth.authenticateToken, (0, _auth.authorizeRoles)("admin"), _orders.deleteUserOrder);
var _default = exports.default = router;