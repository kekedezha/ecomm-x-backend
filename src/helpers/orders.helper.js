import pool from "../config/db";

// Function to check if the order_id exists for the user requesting it
export const doesOrderExistForUser = async (userId, orderId) => {
  try {
    const result = await pool.query(
      "SELECT * FROM orders WHERE user_id = $1 AND id = $2",
      [userId, orderId]
    );
    if (result.rows.length == 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.log("Error checking if order exists for user.", error);
    throw error;
  }
};
