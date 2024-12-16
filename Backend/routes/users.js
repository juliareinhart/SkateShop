const express = require("express");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const authUser = require("../middleware/authUser"); // Path to your middleware
//import { jwtDecode } from "jwt-decode";

const router = express.Router();

// USER SCHEMA AND ENDPOINT

// GET (Retrieve All Users)
router.get("/", (req, res) => {
  User.find()
    .exec()
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
});

// GET (Retrieve One User)
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send("User not found!");
      }
    })
    .catch((err) => res.status(400).send(err));
});

// USER REGISTRATION (/api/user/register)
// { "email": jsmith@gmail.com", "password": "abc123", firstName: "John", lastName "Smith"}
router.post("/register", (req, res) => {
  // User is trying to create a new account
  // The user account might already exist!
  // We can only create the account if it does not exist

  User.findOne({ email: req.body.email })
    .then((result) => {
      if (result) {
        res.status(400).send("User already exists!");
      } else {
        // Create the new User object
        let newUser = User(req.body);

        // Salt and hash the user password
        newUser.password = bcrypt.hashSync(newUser.password, 10);

        // Save the user account
        newUser
          .save()
          .then((result) => {
            res.status(201).send(result); // you should remove the password hash before sending
          })
          .catch((err) => {
            res.status(400).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// LOGIN ENDPOINT (/api/user/login)
// { "email": "minassn@lamission.edu", "password": "abc123" }
router.post("/login", (req, res) => {
  // Check to make sure the user exists

  User.findOne({ email: req.body.email }).then((result) => {
    if (!result) {
      res.status(400).send("Invalid email/password");
    } else {
      // Step 1: compare the user's stroed hashed password to the one passed in
      bcrypt.compare(req.body.password, result.password, (err, bcresult) => {
        // if bcresult is defined, the password was a match
        if (bcresult) {
          // At this point the username/password are valid

          // Step 2: Create the issue the JWT

          let payLoad = {
            _id: result._id,
            role: result.role,
            firstName: result.firstName,
            balance: result.balance,
          };

          console.log(payLoad);

          // Create the token (sign it)
          let token = jwt.sign(payLoad, process.env.JWT_KEY);

          // Send the token to the client
          res.status(200).send({ jwt: token });
        } else {
          res.status(400).send("Invalid email/password");
        }
      });
    }
  });
});

// PATCH (Update User)
router.patch("/:id", (req, res) => {
  User.findByIdAndUpdate(
    req.params.id, // the id of the user
    req.body, // the object tha tcontains the changes
    {
      new: true, // return the updated object
      runValidators: true, // make sure the updates are validated against the schema
    }
  )
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send("User not found!");
      }
    })
    .catch((err) => res.status(400).send(err));
});

// DELETE (Delete User)
router.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send("User not found!");
      }
    })
    .catch((err) => res.status(400).send(err));
});

// Route to get user's first name
router.get("/firstname", authUser, (req, res) => {
  // At this point, req.user contains the decoded JWT payload
  const userId = req.user._id; // Extract the user's _id from the JWT payload
  console.log(req.user._id);

  User.findById(userId, "firstName") // Query the database for the first name
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ firstName: user.firstName }); // Send the first name
    })
    .catch((error) => {
      console.error("Database error:", error);
      res.status(500).json({ message: "Failed to fetch user data" });
    });
});

router.get("/test", (req, res) => {
  console.log("Test route called!");
  res.status(200).send("Test successful");
});

// Endpoint to save or update the cart
router.post("/cart", authUser, (req, res) => {
  const userId = req.user._id; // Extract the user ID from the decoded token
  const cartItems = req.body.cartItems;

  User.findByIdAndUpdate(
    userId,
    { $set: { cart: cartItems } }, // Save the cart to the user's record
    { new: true, upsert: true } // Create the record if it doesn't exist
  )
    .then((user) => {
      res
        .status(200)
        .json({ message: "Cart updated successfully", cart: user.cart });
    })
    .catch((error) => {
      console.error("Error updating cart:", error);
      res.status(500).json({ message: "Failed to update cart" });
    });
});

router.post("/cart/checkout", authUser, (req, res) => {
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { $set: { cart: [] } }, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      res
        .status(200)
        .send({ message: "Cart cleared successfully", cart: user.cart });
    })
    .catch((error) => {
      console.error("Error clearing cart:", error);
      res.status(500).send({ message: "Error clearing cart" });
    });
});

router.get("/cart", authUser, (req, res) => {
  const userId = req.user._id;

  User.findById(userId, "cart balance") // Fetch both `cart` and `balance`
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      res.status(200).send({ cart: user.cart, balance: user.balance });
    })
    .catch((error) => {
      console.error("Error fetching cart and balance:", error);
      res.status(500).send({ message: "Error fetching data" });
    });
});

router.patch("/balance", authUser, (req, res) => {
  const userId = req.user._id;
  const { newBalance } = req.body;

  User.findByIdAndUpdate(userId, { balance: newBalance }, { new: true }) // Update balance
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      res.status(200).send({ balance: user.balance });
    })
    .catch((error) => {
      console.error("Error updating balance:", error);
      res.status(500).send({ message: "Error updating balance" });
    });
});

module.exports = router;
