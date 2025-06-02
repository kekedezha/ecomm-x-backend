"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _products = require("../controllers/products.controller");
var _auth = require("../middleware/auth");
// Import 'Router' class from the express module to create modular route handlers

// Initialize a router instance to use with 'products' routes
const router = (0, _express.Router)();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/AllProducts'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 */
router.get("/", _products.getAllProducts);

/**
 * @swagger
 * /products/{productId}:
 *  get:
 *    summary: Get product for specified id
 *    tags: [Products]
 *    parameters:
 *      - $ref: '#/components/parameters/ProductIdParam'
 *    responses:
 *      200:
 *        description: Product with specified id
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: The error message.
 *              example:
 *                error: Bad Request. Invalid product id.
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
 *                error: Product not found.
 *      500:
 *        description: Internal Server Error
 *        content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 */
router.get("/:productId", _products.getProductById);

/**
 * @swagger
 * /products/admin:
 *  post:
 *    summary: Get product for specified id -- ADMIN ONLY
 *    tags: [Products]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/NewProduct'
 *    responses:
 *       201:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/CreatedProduct'
 *       400:
 *         description: Bad Request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message.
 *               example:
 *                 error: Bad Request. Missing or invalid product information.
 *       401:
 *         description: Missing token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MissingToken'
 *       403:
 *         description: >
 *           Unauthorized. Possible reasons:
 *            - The user has send over an invalid token.
 *            - The user is trying to access a admin path and does not have admin privileges.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unauthorized'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 */
router.post("/admin", _auth.authenticateToken, (0, _auth.authorizeRoles)("admin"), _products.addNewProduct);

/**
 * @swagger
 * /products/admin/{productId}:
 *  put:
 *    summary: Update product for specified id -- ADMIN ONLY
 *    tags: [Products]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - $ref: '#/components/parameters/ProductIdParam'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UpdatedProduct'
 *    responses:
 *      200:
 *        description: Successful update.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                id: 1
 *                name: Donut
 *                description: Fried dough with icing and toppings.
 *                price: 2.99
 *                stock: 50
 *                category_id: 2
 *                created_at: 2025-03-27 11:12:51.008486
 *      400:
 *        description: Bad request.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: The error message.
 *              example:
 *                error: "'Invalid product ID.' OR 'No fields provided for update.'"
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
 *              properties:
 *                error:
 *                  type: string
 *                  description: The error message.
 *              example:
 *                error: Product not found.
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/InternalServerError'
 */
router.put("/admin/:productId", _auth.authenticateToken, (0, _auth.authorizeRoles)("admin"), _products.updateProduct);

/**
 * @swagger
 * /products/admin/{productId}:
 *  delete:
 *    summary: Delete product for specified id -- ADMIN ONLY
 *    tags: [Products]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - $ref: '#/components/parameters/ProductIdParam'
 *    responses:
 *      200:
 *        description: Successful deletion.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Response message
 *                deleteProduct:
 *                  type: object
 *                  description: Object of deleted product
 *              example:
 *                message: Successfully deleted product.
 *                deletedProduct:
 *                  id: 1
 *                  name: Donut
 *                  description: Fried dough with icing and toppings.
 *                  price: 2.99
 *                  stock: 50
 *                  category_id: 2
 *                  created_at: 2025-03-27 11:12:51.008486
 *      400:
 *        description: Bad Request.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: The error message.
 *              example:
 *                error: Invalid product ID.
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
 *              properties:
 *                error:
 *                  type: string
 *                  description: The error message.
 *              example:
 *                error: Product not found.
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/InternalServerError'
 */
router.delete("/admin/:productId", _auth.authenticateToken, (0, _auth.authorizeRoles)("admin"), _products.deleteProduct);
var _default = exports.default = router;