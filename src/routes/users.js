// Import 'Router' class from the express module to create modular route handlers
import { Router } from "express";

// Initialize a router instance to use with 'users' routes
const router = Router();

router.get("/", (req, res) => {
  return res.send("General GET HTTP method on users resource");
});

router.get("/:userId", (req, res) => {
  return res.send(
    `GET HTTP method on user resource for users/${req.params.userId}`
  );
});

router.post("/", (req, res) => {
  return res.send("POST HTTP method on users resource");
});

router.put("/:userId", (req, res) => {
  return res.send(
    `PUT HTTP method on users resource for users/${req.params.userId}`
  );
});

router.delete("/:userId", (req, res) => {
  return res.send(
    `DELETE HTTP method on users resource for users/${req.params.userId}`
  );
});

export default router;
