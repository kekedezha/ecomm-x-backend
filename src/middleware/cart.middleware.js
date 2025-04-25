import pool from "../db";

export const checkIfProdExistsInDB = async (req, res, next) => {
  try {
    const productId = parseInt(req.body.productId);
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [
      productId,
    ]);
    if (result.rows.length == 0) {
      res.status(404).json({ error: "Product does not exist." });
    }
    req.productId = result.rows[0].id;
    next();
  } catch (error) {
    console.log("Error adding product to cart: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};
