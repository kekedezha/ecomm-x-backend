import pool from "../db";

// GET all products
export const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching products: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [
      productId,
    ]);
    if (result.rows.length == 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching specified product: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// POST function for admin use
export const addNewProduct = async (req, res) => {
  try {
    const id = parseInt(req.body.id);
    const name = req.body.name;
    const description = req.body.description;
    const price = parseFloat(req.body.price);
    const stock = parseInt(req.body.stock);
    const categoryId = parseInt(req.body.categoryId);

    if (
      id != NaN &&
      name != undefined &&
      description != undefined &&
      price != NaN &&
      stock != NaN &&
      categoryId != NaN
    ) {
      const result = await pool.query(
        "INSERT INTO products (id, name, description, price, stock, category_id) VALUES ($1, $2, $3, $4, $5, $6)",
        [id, name, description, price, stock, categoryId]
      );
      console.log(result);
      res.status(201).json("Successfully created new product!");
    } else {
      return res.status(400).json({
        error: "Bad Request. Missing product information. Please try again.",
      });
    }
  } catch (error) {
    console.error("Error creating product: ", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

// PUT function for admin use
export const updateProduct = async (req, res) => {
  try {
  } catch (error) {}
};

// DELETE function for admin use
export const deleteProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const result = await pool.query("DELETE FROM products WHERE id = $1", [
      productId,
    ]);
  } catch (error) {}
};
