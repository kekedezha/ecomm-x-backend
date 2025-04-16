// Import bcrypt object for hashing assistance
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";

// function used to hash a new user's password to be stored in the db
export const hashPassword = async (unhashedPassword) => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(unhashedPassword, salt);
};

export const comparePassword = async (passwordInput, hashedPassword) => {
  return await bcrypt.compare(passwordInput, hashedPassword);
};

export const generateJWT = (payload) => {
  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: "30m" };
  return jwt.sign(payload, secret, options);
};
