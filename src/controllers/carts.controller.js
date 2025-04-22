import pool from "../db";

// GET function to retrieve current cart for user
export const getUsersCurrentCart = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error fetching cart: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// POST function to add a product to the cart
export const addProductToCart = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error adding product to cart: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// PUT function to update quantity of a product in the cart
export const updateProductQty = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error updating cart: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// DELETE function to remove individual items from cart
export const deleteProdFromCart = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error deleting product from cart: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// DELETE function to clear current cart
export const clearCart = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error clearing cart: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};
