import pool from "../db";

// GET function to list all categories
export const getAllCategories = async (req, res) => {
  try {
    const result = await pool.query("SELECT name FROM categories");
    res.status(200).json(result.rows);
  } catch (error) {
    console.log("Error fetching categories: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// GET function to get all products in a category
export const getProdsByCategory = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.categoryId);
    if (isNaN(categoryId)) {
      return res
        .status(400)
        .json({ error: "Bad Request. Invalid Category ID." });
    }
    const result = await pool.query(
      "SELECT name, description, price, stock, category_id FROM products WHERE category_id = $1",
      [categoryId]
    );
    if (result.rows.length == 0) {
      return res.status(404).json({ error: "Category not found." });
    }
    res.status(200).json({
      message: "Successfully retrieved products.",
      products: result.rows,
    });
  } catch (error) {
    console.log("Error fetching products by category: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// POST function to create a new category -- ADMIN ONLY
export const createNewCategory = async (req, res) => {
  try {
    const newCategory = req.body.newCategory;
    if (!newCategory) {
      return res
        .status(400)
        .json({ error: "Bad Request. Missing category name." });
    }
    const result = await pool.query(
      "INSERT INTO categories (name) VALUES ($1) RETURNING *",
      [newCategory]
    );
    res.status(201).json({
      message: "Successfully created new category.",
      new_category: result.rows[0],
    });
  } catch (error) {
    console.log("Error creating category: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// PUT function to update a category -- ADMIN ONLY
export const updateCategory = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.categoryId);
    if (isNaN(categoryId)) {
      return res
        .status(400)
        .json({ error: "Bad Request. Invalid Category ID." });
    }
    const categoryUpdate = req.body.categoryUpdate;
    if (!categoryUpdate) {
      return res.status(400).json({ error: "Bad Request. Missing update." });
    }
    const result = await pool.query(
      "UPDATE categories SET name = $1 WHERE id = $2 RETURNING *",
      [categoryUpdate, categoryId]
    );
    res.status(200).json({
      message: "Successfully updated category name.",
      updatedCategory: result.rows[0],
    });
  } catch (error) {
    console.log("Error updating category: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// DELETE function to delete a category -- ADMIN ONLY
export const deleteCategory = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.categoryId);
    if (isNaN(categoryId)) {
      return res
        .status(400)
        .json({ error: "Bad Request. Invalid Category ID." });
    }
    const result = await pool.query(
      "DELETE FROM categories WHERE id = $1 RETURNING *",
      [categoryId]
    );
    if (result.rows.length == 0) {
      return res.status(404).json({ error: "Category not found." });
    }
    res.status(200).json({
      message: "Successfully deleted category.",
      deletedCategory: result.rows[0],
    });
  } catch (error) {
    console.log("Error deleting category: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};
