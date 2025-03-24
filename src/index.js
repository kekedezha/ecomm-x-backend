import express from "express"; // Import express module from express package
import "dotenv/config"; // Initialize .env variables from .env file
import cors from "cors"; // Import CORS module from CORS package
import routes from "./routes"; // Import routes/end points

const app = express(); // Create instance of an Express application

app.use(cors()); // initialize basic CORS config
app.use(express.json()); //parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // parse URL-encoded data (e.g. from form submissions)
app.use("/cart-items", routes.cartItems); // prefix for 'cart-items' routes
app.use("/carts", routes.carts); // prefix for 'carts' routes
app.use("/categories", routes.categories); // prefix for 'categories' routes
app.use("/order-items", routes.orderItems); // prefix for 'order-items' routes
app.use("/orders", routes.orders); // prefix for 'orders' routes
app.use("/payments", routes.payments); // prefix for 'payments' routes
app.use("/products", routes.products); // prefix for 'products' routes
app.use("/users", routes.users); // prefix for 'users' routes

app.get("/", (req, res) => {
  res.send("Home route");
});

console.log(
  "Hello! This project will be my ecomm back end REST API for a fitness brand!"
);
console.log("I just installed and added nodemon as a project dependency");

app.listen(process.env.PORT, () => {
  console.log(
    `Listening on port ${process.env.PORT}! Initial set up for backend server.`
  );
});
