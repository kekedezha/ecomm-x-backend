// Import 'Router' class from the express module to create modular route handlers
import { Router } from "express";

// Initialize a router instance to use with 'categories' routes
const router = Router();

// GET HTTP route for retrieving all of the categories from the db
router.get("/", (req, res) => {
  return res.send("General GET HTTP method on categories resource");
});

// GET HTTP route for getting a single category from the db
router.get("/:categoryId", (req, res) => {
  return res.send(
    `GET HTTP method on categories resource for categories/${req.params.categoryId}`
  );
});

// POST HTTP route for creating a new category to the db
router.post("/", (req, res) => {
  return res.status(201).send("POST HTTP method on categories resource");
});

// PUT HTTP route for updating a category
router.put("/:categoryId", (req, res) => {
  return res.send(
    `PUT HTTP method on categories resource for categories/${req.params.categoryId}`
  );
});

// DELETE HTTP route for deleting a category
router.delete("/:categoryId", (req, res) => {
  return res.send(
    `DELETE HTTP method on categories resource for categories/${req.params.categoryId}`
  );
});

export default router;
