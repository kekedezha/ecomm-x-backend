import pool from "../config/db";
import { isProductInCart } from "../helpers/carts.helper";

// GET function to retrieve current cart for user
export const getUsersCurrentCart = async (req, res) => {
  try {
    const cartId = parseInt(req.user.cart_id, 10);
    const result = await pool.query(
      "SELECT * FROM cart_items WHERE cart_id = $1",
      [cartId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.log("Error fetching cart: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// POST function to add a product to the cart
export const addProductToCart = async (req, res) => {
  try {
    const cartId = parseInt(req.user.cart_id, 10);
    const productExistsInCart = await isProductInCart(
      cartId,
      req.body.productId
    );

    if (!productExistsInCart) {
      const result = await pool.query(
        "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
        [cartId, req.body.productId, req.body.quantity]
      );
      res.status(201).json({
        message: "Successfully added new product to cart.",
        addedProduct: result.rows[0],
      });
    } else {
      const newQuantity = req.body.quantity + productExistsInCart;
      const result = await pool.query(
        "UPDATE cart_items SET quantity = $1 WHERE cart_id = $2 AND product_id = $3 RETURNING *",
        [newQuantity, cartId, req.productId]
      );
      res.status(201).json({
        message: "Successfully added product to cart.",
        addedProduct: result.rows[0],
      });
    }
  } catch (error) {
    console.log("Error adding product to cart: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// PUT function to update quantity of a product in the cart
export const updateProductQty = async (req, res) => {
  try {
    const cartId = parseInt(req.user.cart_id, 10);
    const productId = parseInt(req.params.productId, 10);
    const quantity = parseInt(req.body.quantity, 10);
    if (isNaN(productId)) {
      return res
        .status(404)
        .json({ error: "Bad Request. Not a valid product." });
    }
    const result = await pool.query(
      "UPDATE cart_items SET quantity = $1 WHERE cart_id = $2 AND product_id = $3 RETURNING *",
      [quantity, cartId, productId]
    );
    if (result.rows.length == 0) {
      return res.status(404).json({ error: "Product not in cart." });
    }
    res.status(200).json({
      message: "Successfully updated quantity of product.",
      updatedProduct: result.rows[0],
    });
  } catch (error) {
    console.log("Error updating cart: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// DELETE function to remove individual items from cart
export const deleteProdFromCart = async (req, res) => {
  try {
    const cartId = parseInt(req.user.cart_id, 10);
    const productId = parseInt(req.params.productId, 10);
    if (isNaN(productId)) {
      return res
        .status(404)
        .json({ error: "Bad Request. Not a valid product." });
    }
    const result = await pool.query(
      "DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2 RETURNING *",
      [cartId, productId]
    );
    if (result.rows.length == 0) {
      return res.status(404).json({ error: "Product not in cart." });
    }
    res.status(200).json({
      message: "Successfully deleted product from cart.",
      deletedProduct: result.rows[0],
    });
  } catch (error) {
    console.log("Error deleting product from cart: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// DELETE function to clear current cart
export const clearCart = async (req, res) => {
  try {
    const cartId = parseInt(req.user.cart_id, 10);
    const result = await pool.query(
      "DELETE FROM cart_items WHERE cart_id = $1 RETURNING *",
      [cartId]
    );
    if (result.rows.length == 0) {
      return res.status(404).json({ error: "No products in cart to delete." });
    }
    res.status(200).json({
      message: "Successfully deleted all products from cart.",
      deletedProducts: result.rows,
    });
  } catch (error) {
    console.log("Error clearing cart: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};
