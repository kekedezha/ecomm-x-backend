// Import 'Router' class from the express module to create modular route handlers
import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  registerNewUser,
  loginUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller";
import {
  authenticateToken,
  authorizeRoles,
  isSameUser,
} from "../middleware/auth";

// Initialize a router instance to use with 'users' routes
const router = Router();

/**
 * @swagger
 * /users/admin:
 *   get:
 *     summary: Get all the users from the db -- ADMIN ONLY
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all users from the db
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AllUsers'
 *       401:
 *         description: Missing token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MissingToken'
 *       403:
 *         description: >
 *           Unauthorized. Possible reasons:
 *             - The user has send over an invalid token.
 *             - The user is trying to access a admin path and does not have admin privileges.
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
 *
 */
router.get("/admin", authenticateToken, authorizeRoles("admin"), getAllUsers);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get the current users account information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserIdParam'
 *     responses:
 *       200:
 *         description: Successfully retrieved users' account info
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Missing token or user is trying to access an order that does not belong to them.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 error: "'Missing token.' OR 'User is not authorized to view user information that is not one's self.'"
 *       403:
 *         description: Invalid token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 error: Invalid token.
 *       404:
 *         description: Not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message.
 *               example:
 *                 error: User not found.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 */
router.get("/:userId", authenticateToken, isSameUser, getUserById);

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register new user account
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser'
 *     responses:
 *       201:
 *         description: Successfully created new user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisteredUser'
 *       400:
 *         description: Bad Request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 error: Bad Request. Missing or invalid user information.
 *       409:
 *         description: Conflict.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 error: Username or email already exists.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 */
router.post("/register", registerNewUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login to user account
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Successful login.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: Successfully logged in!
 *                 token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzQ4NTAwMDAsImV4cCI6MTY3NDg1MzkyMH0.s3e5h7j9f1a6x4o0
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 error: Incorrect password. Please try again.
 *       404:
 *         description: Not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 error: Username or email was not found.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     summary: Update user account
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserIdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdates'
 *     responses:
 *       200:
 *         description: Updated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdatedUser'
 *       400:
 *         description: >
 *           Bad Request. Possible reasons:
 *             - Invalid user ID
 *             - No fields provided for update
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 error: "'Invalid user ID.' OR 'No fields provided for update.'"
 *       401:
 *         description: Missing token or user is trying to access an order that does not belong to them.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 error: "'Missing token.' OR 'User is not authorized to view user information that is not one's self.'"
 *       403:
 *         description: Invalid token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 error: Invalid token.
 *       404:
 *         description: Not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 error: User not found.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 */
router.put("/:userId", authenticateToken, isSameUser, updateUser);

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Delete user account
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserIdParam'
 *     responses:
 *       200:
 *         description: Successfully deleted user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeletedUser'
 *       400:
 *         description: Bad Request.
 *         content:
 *          application/json:
 *             schema:
 *               type: object
 *               example:
 *                 error: Invalid user ID.
 *       401:
 *         description: Missing token or user is trying to access an order that does not belong to them.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 error: "'Missing token.' OR 'User is not authorized to view user information that is not one's self.'"
 *       403:
 *         description: Invalid token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 error: Invalid token.
 *       404:
 *         description: Not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 error: User not found.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 */
router.delete("/:userId", authenticateToken, isSameUser, deleteUser);

export default router;
