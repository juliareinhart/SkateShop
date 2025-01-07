require("dotenv").config();
const express = require("express");
const database = require("./database.js");
const mongoose = require("mongoose");
const cors = require("cors");
const itemRoutes = require("./routes/items.js");
const userRoutes = require("./routes/users.js");
const askOllamaRoutes = require("./routes/askOllama.js");
//change one to see github

// Create the Express app instance
const app = express();

console.log("app");
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

app.use(cors()); // Allows all cross-origin requests by default

// Add the static routing (Middleware) (Handle static requests index.html, style.css, etc)
// This will make Node function as a traditional static web server
app.use(express.static("./public"));

app.use("", itemRoutes);
app.use("/api/user", userRoutes);
app.use("", askOllamaRoutes);

// This Middleware automatically converts JSON POST/PATCH requests to an object and stores that
// object in the req.body
// ONLY used for incoming POST/PATCH
// Automatically adds the body object to the request (req.body)
app.use(express.json());

app.listen(9000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server started on port 9000, Loading State");
  }
});
