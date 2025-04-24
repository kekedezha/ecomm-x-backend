import pool from "../db";

// function to check if a cart has the product
export const isProductInCart = async (cartId, productId) => {
  try {
    const doesProductExist = await pool.query(
      "SELECT * from cart_items WHERE cart_id = $1 AND product_id = $2",
      [cartId, productId]
    );
    if (doesProductExist.rows.length == 0) {
      return null;
    }
    return parseInt(doesProductExist.rows[0].quantity, 10);
  } catch (error) {
    console.log("Error checking products in cart: ", error);
    throw error;
  }
};
