"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hashPassword = exports.generateJWT = exports.createUserCart = exports.comparePassword = exports.checkIfCartExists = void 0;
var _bcrypt = _interopRequireDefault(require("bcrypt"));
require("dotenv/config");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _db = _interopRequireDefault(require("../config/db"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Import bcrypt object for hashing assistance

// function used to hash a new user's password to be stored in the db
const hashPassword = async unhashedPassword => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
  const salt = await _bcrypt.default.genSalt(saltRounds);
  return await _bcrypt.default.hash(unhashedPassword, salt);
};

// function to compare if user-input password matches password on file
exports.hashPassword = hashPassword;
const comparePassword = async (passwordInput, hashedPassword) => {
  return await _bcrypt.default.compare(passwordInput, hashedPassword);
};

// function to generate JWT with 30 min expiration
exports.comparePassword = comparePassword;
const generateJWT = payload => {
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: "30m"
  };
  return _jsonwebtoken.default.sign(payload, secret, options);
};

// function to create a new user cart upon registration or if checkIfCartExists function is false
exports.generateJWT = generateJWT;
const createUserCart = async userId => {
  try {
    const cartResult = await _db.default.query("INSERT INTO carts (user_id) VALUES ($1) RETURNING id", [userId]);
    return cartResult.rows[0].id;
  } catch (error) {
    console.log("Error creating user's cart: ", error);
    throw error;
  }
};

// function to check if a cart has been created for the user yet. Should mainly return true unless user was manually added to the db
exports.createUserCart = createUserCart;
const checkIfCartExists = async userId => {
  try {
    const doesCartExist = await _db.default.query("SELECT * from carts WHERE user_id = $1", [userId]);
    if (doesCartExist.rows.length == 0) {
      return null;
    }
    return doesCartExist.rows[0].id;
  } catch (error) {
    console.log("Error fetching user cart: ", error);
    throw error;
  }
};
exports.checkIfCartExists = checkIfCartExists;