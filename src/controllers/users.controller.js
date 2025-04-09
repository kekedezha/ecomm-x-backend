// Import 'Router class from the express module to create modular route handlers
import pool from "../db";
import { hashPassword, comparePassword } from "../helpers/users.helper";
// GET function - retrieve all users ADMIN ONLY
export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
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

// POST function - create a new user
export const registerNewUser = async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    let address = "";
    if (req.body.address) {
      address = req.body.address;
    }
    if (!username || !email || !password || !firstName || !lastName) {
      return res
        .status(400)
        .json({ error: "Bad Request. Missing or invalid user information." });
    }

    const hash = await hashPassword(password);

    const result = await pool.query(
      "INSERT INTO users (username, email, password, first_name, last_name, address) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, username, first_name",
      [username, email, hash, firstName, lastName, address]
    );
    res.status(201).json({
      message: "Successfully created new user!",
      user: result.rows[0],
    });
  } catch (error) {
    console.log("Error creating user: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// POST function - authenticate a user and return token
export const loginUser = async (req, res) => {
  try {
    // get username or email from request
    let user;
    let result;
    if (req.body.username) {
      user = req.body.username;
      result = await pool.query(
        "SELECT password FROM users WHERE username = $1",
        [user]
      );
    } else {
      user = req.body.email;
      result = await pool.query("SELECT password FROM users WHERE email = $1", [
        user,
      ]);
    }
    if (result.rows.length == 0) {
      return res
        .status(404)
        .json({ error: "Username or email was not found." });
    }

    const hashedPassword = result.rows[0].password;
    const inputPassword = req.body.password;

    if (await comparePassword(inputPassword, hashedPassword)) {
      res.status(200).json({ message: "Successfully logged in!" });
      console.log("Login successful");
    } else {
      res
        .status(401)
        .json({ message: "Incorrect password. Please try again." });
      console.log(`Unsuccessful login by ${user}`);
    }
  } catch (error) {
    console.log("Error logging in: ", error);
    res.status(500).json({ error: "Internal Server Error. " });
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
      (key, index) => `"${key}" = $${index + 1}`
    );
    const values = Object.values(updates);
    values.push(userId);

    const query = `UPDATE users SET ${middleQuery} WHERE id = $${values.length} RETURNING *`;
    const { rows } = await pool.query(query, values);

    if (rows.length == 0) {
      return res.status(404).json({ error: "User not found." });
    }
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
      message: "Successfully deleted product.",
      deletedUser: result.rows[0],
    });
  } catch (error) {
    console.error("Error fetching specified user: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};
