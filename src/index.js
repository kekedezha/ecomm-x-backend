import express from "express"; // Import express module from express package
import cors from "cors"; // Import CORS module from CORS package
import routes from "./routes/index.js"; // Import routes/end points
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import { swaggerOptions } from "./config/swaggerOptions.js";

const app = express(); // Create instance of an Express application
const swaggerSpec = swaggerJSDoc(swaggerOptions); // create instance of swagger-tools specification from swagger options setup

app.use(cors()); // initialize basic CORS config
app.use(express.json()); //parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // parse URL-encoded data (e.g. from form submissions)
app.use("/carts", routes.carts); // prefix for 'carts' routes
app.use("/categories", routes.categories); // prefix for 'categories' routes
app.use("/checkout", routes.checkout); // prefix for 'checkout' routes
app.use("/orders", routes.orders); // prefix for 'orders' routes
app.use("/payments", routes.payments); // prefix for 'payments' routes
app.use("/products", routes.products); // prefix for 'products' routes
app.use("/users", routes.users); // prefix for 'users' routes
app.use("/api-docs", serve, setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send(
    "Welcome to the home route for the backend REST API for X fitness brand."
  );
});

export default app; // Export app without starting the server

// Benefits of this approach:
// 1. Prevents Server from Auto-Starting in Tests
//    - Tests don't accidentally start the server when requiring the app.
// 2. Enables Better Testing
//    - You can import app for testing while keeping server.js for production
// 3. Allows Clean Shutdown
//    - You can close the server after tests to free up sources.
