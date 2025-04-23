import pool from "../db";

// GET function to list all categories
export const getAllCategories = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error fetching categories: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// GET function to get all products in a category
export const getProdsByCategory = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error products by category: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// POST function to create a new category -- ADMIN ONLY
export const createNewCategory = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error creating category: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// PUT function to update a category -- ADMIN ONLY
export const updateCategory = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error updating category: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// DELETE function to delete a category -- ADMIN ONLY
export const deleteCategory = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error deleting category: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};
