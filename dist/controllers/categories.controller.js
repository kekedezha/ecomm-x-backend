'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.updateCategory =
  exports.getProdsByCategory =
  exports.getAllCategories =
  exports.deleteCategory =
  exports.createNewCategory =
    void 0;
var _db = _interopRequireDefault(require('../config/db'));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e };
}
// GET function to list all categories
const getAllCategories = async (req, res) => {
  try {
    const result = await _db.default.query('SELECT name FROM categories');
    res.status(200).json(result.rows);
  } catch (error) {
    console.log('Error fetching categories: ', error);
    res.status(500).json({
      error: 'Internal Server Error.',
    });
  }
};

// GET function to get all products in a category
exports.getAllCategories = getAllCategories;
const getProdsByCategory = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.categoryId);
    if (isNaN(categoryId)) {
      return res.status(400).json({
        error: 'Bad Request. Invalid Category ID.',
      });
    }
    const result = await _db.default.query(
      'SELECT name, description, price, stock, category_id FROM products WHERE category_id = $1',
      [categoryId],
    );
    if (result.rows.length == 0) {
      return res.status(404).json({
        error: 'Category not found.',
      });
    }
    res.status(200).json({
      message: 'Successfully retrieved products.',
      products: result.rows,
    });
  } catch (error) {
    console.log('Error fetching products by category: ', error);
    res.status(500).json({
      error: 'Internal Server Error.',
    });
  }
};

// POST function to create a new category -- ADMIN ONLY
exports.getProdsByCategory = getProdsByCategory;
const createNewCategory = async (req, res) => {
  try {
    const newCategory = req.body.newCategory;
    if (!newCategory) {
      return res.status(400).json({
        error: 'Bad Request. Missing category name.',
      });
    }
    const result = await _db.default.query(
      'INSERT INTO categories (name) VALUES ($1) RETURNING *',
      [newCategory],
    );
    res.status(201).json({
      message: 'Successfully created new category.',
      new_category: result.rows[0],
    });
  } catch (error) {
    console.log('Error creating category: ', error);
    res.status(500).json({
      error: 'Internal Server Error.',
    });
  }
};

// PUT function to update a category -- ADMIN ONLY
exports.createNewCategory = createNewCategory;
const updateCategory = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.categoryId);
    if (isNaN(categoryId)) {
      return res.status(400).json({
        error: 'Bad Request. Invalid Category ID.',
      });
    }
    const categoryUpdate = req.body.categoryUpdate;
    if (!categoryUpdate) {
      return res.status(400).json({
        error: 'Bad Request. Missing update.',
      });
    }
    const result = await _db.default.query(
      'UPDATE categories SET name = $1 WHERE id = $2 RETURNING *',
      [categoryUpdate, categoryId],
    );
    if (result.rows.length == 0) {
      return res.status(404).json({
        error: 'Category not found.',
      });
    }
    res.status(200).json({
      message: 'Successfully updated category name.',
      updatedCategory: result.rows[0],
    });
  } catch (error) {
    console.log('Error updating category: ', error);
    res.status(500).json({
      error: 'Internal Server Error.',
    });
  }
};

// DELETE function to delete a category -- ADMIN ONLY
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.categoryId);
    if (isNaN(categoryId)) {
      return res.status(400).json({
        error: 'Bad Request. Invalid Category ID.',
      });
    }
    const result = await _db.default.query(
      'DELETE FROM categories WHERE id = $1 RETURNING *',
      [categoryId],
    );
    if (result.rows.length == 0) {
      return res.status(404).json({
        error: 'Category not found.',
      });
    }
    res.status(200).json({
      message: 'Successfully deleted category.',
      deletedCategory: result.rows[0],
    });
  } catch (error) {
    console.log('Error deleting category: ', error);
    res.status(500).json({
      error: 'Internal Server Error.',
    });
  }
};
exports.deleteCategory = deleteCategory;
