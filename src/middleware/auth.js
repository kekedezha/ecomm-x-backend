import jwt from "jsonwebtoken";
import "dotenv/config";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1]; // Split string 'Bearer <token>'

  if (!token) return res.status(401).json({ error: "User is unauthorized." });

  /**
   * JWT payload from jwt.verify()
   * -----------------------------
   * jwt payload = {
   *  id: 'xxxx',
   *  username: 'xxxx',
   *  role: 'user',
   * }
   */

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: err });
    req.user = user; // Attach user info to request
    /**
     * user = {
     *  id: 'xxxx',
     *  username: 'xxxx',
     *  role: 'user',
     *  iat: 999999  // issued at,
     *  eat: 999999  // expires at,
     * }
     */
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
