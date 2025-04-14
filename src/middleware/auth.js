import jwt from "jsonwebtoken";
import "dotenv/config";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1]; // Split string 'Bearer <token>'

  if (!token) return res.status(401).json({ error: "User is unauthorized." });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ error: "Forbidden. JWT invalid or expired." });
    req.user = user; // Attach user info to request
    next(); // Proceed to route handler
  });
};
