// Import bcrypt object for hashing assistance
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";
import pool from "../db";

// function used to hash a new user's password to be stored in the db
export const hashPassword = async (unhashedPassword) => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(unhashedPassword, salt);
};

// function to compare if user-input password matches password on file
export const comparePassword = async (passwordInput, hashedPassword) => {
  return await bcrypt.compare(passwordInput, hashedPassword);
};

// function to generate JWT with 30 min expiration
export const generateJWT = (payload) => {
  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: "30m" };
  return jwt.sign(payload, secret, options);
};

// function to create a new user cart upon registration or if checkIfCartExists function is false
export const createUserCart = async (userId) => {
  try {
    const cartResult = await pool.query(
      "INSERT INTO carts (user_id) VALUES ($1) RETURNING id",
      [userId]
    );
    return cartResult.rows[0].id;
  } catch (error) {
    console.log("Error creating user's cart: ", error);
    throw error;
  }
};

// function to check if a cart has been created for the user yet. Should mainly return true unless user was manually added to the db
export const checkIfCartExists = async (userId) => {
  try {
    const doesCartExist = await pool.query(
      "SELECT * from carts WHERE user_id = $1",
      [userId]
    );
    if (doesCartExist.rows.length == 0) {
      return null;
    }
    return doesCartExist.rows[0].id;
  } catch (error) {
    console.log("Error fetching user cart: ", error);
    throw error;
  }
};

// function to check if a cart has the product
export const isProductInCart = async (cartId, productId) => {
  try {
    const doesProductExist = await pool.query(
      "SELECT * from cart_items WHERE cart_id = $1 AND product_id = $2",
      [cartId, productId]
    );
    if (doesProductExist.rows.length == 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.log("Error checking products in cart: ", error);
    throw error;
  }
};
