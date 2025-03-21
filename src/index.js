import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();

app.use(cors());

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
