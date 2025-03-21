import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Home route");
});

console.log(
  "Hello! This project will be my ecomm back end REST API for a fitness brand!"
);
console.log("I just installed and added nodemon as a project dependency");

app.listen(3000, () => {
  console.log("Listening! Initial set up for backend server.");
});
