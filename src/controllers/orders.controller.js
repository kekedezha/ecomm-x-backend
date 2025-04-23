import pool from "../db";

// GET function for retrieving all orders for user
export const getAllUserOrders = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error fetching orders: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// GET function for retrieving specific order for specific user
export const getOrderForUser = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error fetching order: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// POST function for creating an order from the cart
export const createOrder = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error creating order: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// PUT function for updating order status -- ADMIN ONLY
export const updateOrderStatus = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error updating order status: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// DELETE function to delete/cancel an order -- ADMIN ONLY
export const deleteUserOrder = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error deleting/canceling an order: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};
