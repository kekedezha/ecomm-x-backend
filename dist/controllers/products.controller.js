"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProduct = exports.getProductById = exports.getAllProducts = exports.deleteProduct = exports.addNewProduct = void 0;
var _db = _interopRequireDefault(require("../config/db"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// GET all products
const getAllProducts = async (req, res) => {
  try {
    const result = await _db.default.query("SELECT id, name, description, price, stock, category_id FROM products");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching products: ", error);
    res.status(500).json({
      error: "Internal Server Error."
    });
  }
};
exports.getAllProducts = getAllProducts;
const getProductById = async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    if (isNaN(productId)) {
      return res.status(400).json({
        error: "Bad Request. Invalid product id."
      });
    }
    const result = await _db.default.query("SELECT * FROM products WHERE id = $1", [productId]);
    if (result.rows.length == 0) {
      return res.status(404).json({
        error: "Product not found."
      });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching specified product: ", error);
    res.status(500).json({
      error: "Internal Server Error."
    });
  }
};

// POST function for admin use
exports.getProductById = getProductById;
const addNewProduct = async (req, res) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const price = parseFloat(req.body.price);
    const stock = parseInt(req.body.stock);
    const categoryId = parseInt(req.body.categoryId);
    if (!name || !description || Number.isNaN(price) || Number.isNaN(stock) || Number.isNaN(categoryId)) {
      return res.status(400).json({
        error: "Bad Request. Missing or invalid product information."
      });
    }
    const result = await _db.default.query("INSERT INTO products (name, description, price, stock, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *", [name, description, price, stock, categoryId]);
    res.status(201).json({
      message: "Successfully created new product!",
      product: result.rows[0]
    });
  } catch (error) {
    console.error("Error creating product: ", error);
    res.status(500).send({
      error: "Internal Server Error."
    });
  }
};

// PUT function for admin use
exports.addNewProduct = addNewProduct;
const updateProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    if (Number.isNaN(productId)) {
      return res.status(400).json({
        error: "Invalid product ID."
      });
    }
    const updates = req.body;
    // Ensure there's at least one field to update
    if (Object.keys(updates).length == 0) {
      return res.status(400).json({
        error: "No fields provided for update."
      });
    }

    // Create dynamic query
    const setClause = Object.keys(updates).map((key, index) => `"${key}" = $${index + 1}`);
    const values = Object.values(updates);
    values.push(productId);
    const query = `UPDATE products SET ${setClause} WHERE id = $${values.length} RETURNING *`;
    const {
      rows
    } = await _db.default.query(query, values);
    if (rows.length == 0) {
      return res.status(404).json({
        error: "Product not found."
      });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error updating specified product: ", error);
    res.status(500).send({
      error: "Internal Server Error."
    });
  }
};

// DELETE function for admin use
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    if (Number.isNaN(productId)) {
      return res.status(400).json({
        error: "Invalid product ID."
      });
    }
    const result = await _db.default.query("DELETE FROM products WHERE id = $1 RETURNING *", [productId]);
    if (result.rowCount == 0) {
      return res.status(404).json({
        error: "Product not found."
      });
    }
    return res.status(200).json({
      message: "Successfully deleted product.",
      deletedProduct: result.rows[0]
    });
  } catch (error) {
    console.error("Error deleting specified product: ", error);
    res.status(500).send({
      error: "Internal Server Error."
    });
  }
};
exports.deleteProduct = deleteProduct;