import jwt from "jsonwebtoken";
import "dotenv/config";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1]; // Split string 'Bearer <token>'
  if (!token) return res.status(401).json({ error: "User is unauthorized." });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: err });
    req.user = user; // Attach user info to request
    next(); // Proceed to route handler
  });
};

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
};

export const isSameUser = (req, res, next) => {
  if (parseInt(req.user.id) != parseInt(req.params.userId))
    return res.status(401).json({
      error:
        "User is not authorized to view user information that is not one's self.",
    });
  return next();
};

/**
 * JWT payload from jwt.verify()
 * -----------------------------
 * jwt payload = {
 *  id: 'xxxx',
 *  username: 'xxxx',
 *  role: 'user',
 * }
 */

/**
 * user = {
 *  id: 'xxxx',
 *  username: 'xxxx',
 *  role: 'user',
 *  iat: 999999  // issued at,
 *  eat: 999999  // expires at,
 * }
 */
