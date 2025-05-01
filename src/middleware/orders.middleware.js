import pool from "../db";

export const checkIfUserExists = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    if (isNaN(userId)) {
      return res
        .status(400)
        .json({ error: "Bad Request. Not a valid user ID." });
    }
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    if (result.rows.length == 0) {
      return res.status(404).json({ error: "User not found." });
    }
    next();
  } catch (error) {
    console.log("Error checking if user exists: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};
