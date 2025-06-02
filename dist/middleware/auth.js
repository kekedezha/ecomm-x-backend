"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSameUser = exports.authorizeRoles = exports.authenticateToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
require("dotenv/config");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1]; // Split string 'Bearer <token>'
  if (!token) return res.status(401).json({
    error: "Missing token."
  });
  _jsonwebtoken.default.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({
      error: "Invalid token."
    });
    req.user = user; // Attach user info to request
    next(); // Proceed to route handler
  });
};
exports.authenticateToken = authenticateToken;
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: "Access denied."
      });
    }
    next();
  };
};
exports.authorizeRoles = authorizeRoles;
const isSameUser = (req, res, next) => {
  if (parseInt(req.user.id) != parseInt(req.params.userId)) return res.status(401).json({
    error: "User is not authorized to view user information that is not one's self."
  });
  return next();
};

/**
 * JWT payload from jwt.sign()
 * -----------------------------
 * jwt payload = {
 *  id: 'xxxx',
 *  username: 'xxxx',
 *  role: 'user',
 *  cart_id: 'xxxx',
 * }
 */

/**
 * user = {
 *  id: 'xxxx',
 *  username: 'xxxx',
 *  role: 'user',
 *  cart_id: 'xxxx',
 *  iat: 999999  // issued at,
 *  eat: 999999  // expires at,
 * }
 */
exports.isSameUser = isSameUser;