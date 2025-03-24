// Import 'Router' class from the express module to create modular route handlers
import { Router } from "express";

// Initialize a router instance to use with 'users' routes
const router = Router();

// GET HTTP route for retrieving all of the users from the db
router.get("/", (req, res) => {
  return res.send("General GET HTTP method on users resource");
});

// GET HTTP route for getting a single user from the db
router.get("/:userId", (req, res) => {
  return res.send(
    `GET HTTP method on user resource for users/${req.params.userId}`
  );
});

// POST HTTP route for creating a new user to the db
router.post("/", (req, res) => {
  return res.send("POST HTTP method on users resource");
});

// PUT HTTP route for updating a users info
router.put("/:userId", (req, res) => {
  return res.send(
    `PUT HTTP method on users resource for users/${req.params.userId}`
  );
});

// DELETE HTTP route for deleting a user
router.delete("/:userId", (req, res) => {
  return res.send(
    `DELETE HTTP method on users resource for users/${req.params.userId}`
  );
});

export default router;
