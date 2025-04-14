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
   *  id: 'xxxx'
   *  username: 'xxxx'
   * }
   */

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: err });
    req.user = user; // Attach user info to request
    /**
     * user = {
     *  id: 'xxxx'
     *  username: 'xxxx'
     *  iat: 999999  // issued at
     *  eat: 999999  // expires at
     * }
     */
    next(); // Proceed to route handler
  });
};
