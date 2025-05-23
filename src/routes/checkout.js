// Import 'Router' class from the express module to create modular route handlers
import { Router } from "express";
import { finalizeOrder } from "../controllers/checkout.controller";
import { authenticateToken, isSameUser } from "../middleware/auth";

// Initialize a router instance to use with 'carts' routes
const router = Router();

/**
 * @swagger
 * /checkout:
 *   post:
 *      summary: Checkout order, finalize order/payment
 *      tags: [Checkout]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CheckoutOrder'
 *      parameters:
 *        - $ref: '#/components/parameters/UserIdParam'
 *      responses:
 *        200:
 *          description: Successfully check out an order
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  message: Payment successful. Order status updated to PAID.
 *                  payment:
 *                    id: 4
 *                    order_id: 99
 *                    payment_method: 'CREDIT CARD'
 *                    status: 'PAID'
 *        400:
 *          description: >
 *            Bad request. Possible reasons:
 *              - Invalid order id. Order id is not a number.
 *              - Invalid order amount. Amount is not a number.
 *              - Payment method missing.
 *              - Order not eligible for checkout
 *              - Payment does not match order total
 *              - Insufficient inventory for products
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  error: "'Bad request. Invalid order id. Order id must be a number.' OR 'Bad request. Invalid order amount. Amount id must be a number.' OR 'Bad request. Missing payment method.' OR 'Order is not eligible for checkout.' OR 'Payment does not match order total.' OR 'Insufficient inventory for products.'"
 *        401:
 *          description: Missing token or user is trying to access an order that does not belong to them.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  error: "'Missing token.' OR 'User is not authorized to view user information that is not one's self.'"
 *        403:
 *          description: Invalid token.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  error: Invalid token.
 *        404:
 *          description: Not found.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  error: Order id not found.
 *        500:
 *          description: Internal Server Error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/InternalServerError'
 *
 */
router.post("/:userId", authenticateToken, isSameUser, finalizeOrder);

export default router;
