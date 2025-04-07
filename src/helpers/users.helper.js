// Import bcrypt object for hashing assistance
import bcrypt from "bcrypt";
import "dotenv/config";

// function used to hash a new user's password to be stored in the db
export const hashPassword = (unhashedPassword) => {
  return bcrypt.hashSync(unhashedPassword, process.env.SALT_ROUNDS);
};

export const comparePassword = (passwordInput, hashedPassword) => {
  return bcrypt.compareSync(passwordInput, hashPassword);
};
