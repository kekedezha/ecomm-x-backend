// Import 'Router class from the express module to create modular route handlers
import { parse } from "dotenv";
import pool from "../db";

// GET function - retrieve all users ADMIN ONLY
export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, username, email, first_name, last_name, address, created_at FROM users"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching users: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// GET function - retrieve user by specified id
export const getUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    if (result.rows.length == 0) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching user: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// POST function - add new user to db
export const addNewUser = async (req, res) => {
  try {
    const userId = parseInt(req.body.userId);
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    let address = "";
    if (req.body.address) {
      address = req.body.address;
    }
    if (
      Number.isNaN(userId) ||
      !username ||
      !email ||
      !password ||
      !firstName ||
      !lastName
    ) {
      return res
        .status(400)
        .json({ error: "Bad Request. Missing or invalid user information." });
    }
    const result = await pool.query(
      "INSERT INTO users (id, username, email, password, first_name, last_name, address) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, username, first_name",
      [userId, username, email, password, firstName, lastName, address]
    );
    res.status(201).json({
      message: "Successfully created new user!",
      user: result.rows[0],
    });
  } catch (error) {
    console.log("Error updating user: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// PUT function - update user by specified id
export const updateUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    if (Number.isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID." });
    }
    const updates = req.body;
    if (Object.keys(updates).length == 0) {
      return res.status(400).json({ error: "No fields provided for update." });
    }

    const middleQuery = Object.keys(updates).map(
      (key, index) => `"${key}": $${index + 1}}`
    );
    const values = Object.values(updates);
    values.push(userId);

    const query = `UPDATE users SET ${middleQuery} WHERE id = $${values.length} RETURNING *`;
    const { rows } = await pool.query(query, values);

    if (rows.length == 0) {
      return res.status(404).json({ error: "User not found." });
    }
    console.log(rows[0]);
    res.status(200).json(rows[0]);
  } catch (error) {
    console.log("Error updating specified user: ", error);
    res.status(500).send({ error: "Internal Server Error." });
  }
};

// DELETE function - delete user from db by specified id
export const deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    if (Number.isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID." });
    }
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [userId]
    );
    if (result.rows.length == 0) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json({
      message: "Successfully delete product.",
      deletedUser: result.rows[0],
    });
  } catch (error) {
    console.error("Error fetching specified user: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};
