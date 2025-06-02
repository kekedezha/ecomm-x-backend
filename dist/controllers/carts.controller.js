"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProductQty = exports.getUsersCurrentCart = exports.deleteProdFromCart = exports.clearCart = exports.addProductToCart = void 0;
var _db = _interopRequireDefault(require("../config/db"));
var _carts = require("../helpers/carts.helper");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// GET function to retrieve current cart for user
const getUsersCurrentCart = async (req, res) => {
  try {
    const cartId = parseInt(req.user.cart_id, 10);
    const result = await _db.default.query("SELECT * FROM cart_items WHERE cart_id = $1", [cartId]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.log("Error fetching cart: ", error);
    res.status(500).json({
      error: "Internal Server Error."
    });
  }
};

// POST function to add a product to the cart
exports.getUsersCurrentCart = getUsersCurrentCart;
const addProductToCart = async (req, res) => {
  try {
    const cartId = parseInt(req.user.cart_id, 10);
    const productExistsInCart = await (0, _carts.isProductInCart)(cartId, req.body.productId);
    if (!productExistsInCart) {
      const result = await _db.default.query("INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *", [cartId, req.body.productId, req.body.quantity]);
      res.status(201).json({
        message: "Successfully added new product to cart.",
        addedProduct: result.rows[0]
      });
    } else {
      const newQuantity = req.body.quantity + productExistsInCart;
      const result = await _db.default.query("UPDATE cart_items SET quantity = $1 WHERE cart_id = $2 AND product_id = $3 RETURNING *", [newQuantity, cartId, req.productId]);
      res.status(201).json({
        message: "Successfully added product to cart.",
        addedProduct: result.rows[0]
      });
    }
  } catch (error) {
    console.log("Error adding product to cart: ", error);
    res.status(500).json({
      error: "Internal Server Error."
    });
  }
};

// PUT function to update quantity of a product in the cart
exports.addProductToCart = addProductToCart;
const updateProductQty = async (req, res) => {
  try {
    const cartId = parseInt(req.user.cart_id, 10);
    const productId = parseInt(req.params.productId, 10);
    const quantity = parseInt(req.body.quantity, 10);
    if (isNaN(productId)) {
      return res.status(400).json({
        error: "Bad Request. Not a valid product."
      });
    }
    const result = await _db.default.query("UPDATE cart_items SET quantity = $1 WHERE cart_id = $2 AND product_id = $3 RETURNING *", [quantity, cartId, productId]);
    if (result.rows.length == 0) {
      return res.status(404).json({
        error: "Product not in cart."
      });
    }
    res.status(200).json({
      message: "Successfully updated quantity of product.",
      updatedProduct: result.rows[0]
    });
  } catch (error) {
    console.log("Error updating cart: ", error);
    res.status(500).json({
      error: "Internal Server Error."
    });
  }
};

// DELETE function to remove individual items from cart
exports.updateProductQty = updateProductQty;
const deleteProdFromCart = async (req, res) => {
  try {
    const cartId = parseInt(req.user.cart_id, 10);
    const productId = parseInt(req.params.productId, 10);
    if (isNaN(productId)) {
      return res.status(400).json({
        error: "Bad Request. Not a valid product."
      });
    }
    const result = await _db.default.query("DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2 RETURNING *", [cartId, productId]);
    if (result.rows.length == 0) {
      return res.status(404).json({
        error: "Product not in cart."
      });
    }
    res.status(200).json({
      message: "Successfully deleted product from cart.",
      deletedProduct: result.rows[0]
    });
  } catch (error) {
    console.log("Error deleting product from cart: ", error);
    res.status(500).json({
      error: "Internal Server Error."
    });
  }
};

// DELETE function to clear current cart
exports.deleteProdFromCart = deleteProdFromCart;
const clearCart = async (req, res) => {
  try {
    const cartId = parseInt(req.user.cart_id, 10);
    const result = await _db.default.query("DELETE FROM cart_items WHERE cart_id = $1 RETURNING *", [cartId]);
    if (result.rows.length == 0) {
      return res.status(404).json({
        error: "No products in cart to delete."
      });
    }
    res.status(200).json({
      message: "Successfully deleted all products from cart.",
      deletedProducts: result.rows
    });
  } catch (error) {
    console.log("Error clearing cart: ", error);
    res.status(500).json({
      error: "Internal Server Error."
    });
  }
};
exports.clearCart = clearCart;