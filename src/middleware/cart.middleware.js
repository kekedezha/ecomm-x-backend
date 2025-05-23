import pool from "../config/db";

export const isValidProduct = async (req, res, next) => {
  try {
    if (!req.body.productId) {
      return res
        .status(400)
        .json({ error: "Bad Request. No product id given." });
    }
    const productId = parseInt(req.body.productId);
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [
      productId,
    ]);
    if (result.rows.length == 0) {
      return res.status(404).json({ error: "Product does not exist." });
    }
    req.productId = parseInt(result.rows[0].id, 10);
    req.quantity = parseInt(req.body.quantity);
    return next();
  } catch (error) {
    console.log("Error adding product to cart: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};
