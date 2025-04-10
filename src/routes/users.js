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

// Initialize a router instance to use with 'users' routes
const router = Router();

// GET HTTP route for retrieving all of the users from the db - ADMIN ONLY
router.get("/admin", getAllUsers);

// GET HTTP route for getting a single user from the db
router.get("/:userId", getUserById);

// POST HTTP route for creating a new user to the db
router.post("/register", registerNewUser);

// POST HTTP route for logging in an existing user
router.post("/login", loginUser);

// PUT HTTP route for updating a users info
router.put("/:userId", updateUser);

// DELETE HTTP route for deleting a user
router.delete("/:userId", deleteUser);

export default router;
