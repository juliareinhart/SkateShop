const mongoose = require("mongoose");

// Schema for the user collection
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 15,
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
      collation: { locale: "en", strength: 2 }, // case in-sensitive index
    },
    match:
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    number: { type: String },
    street: { type: String },
    city: { type: String },
    zip: { type: String },
  },
  phoneNumbers: [
    {
      location: {
        type: String,
        required: true,
        enum: ["home", "work", "cell", "other"],
      },
      number: {
        type: String,
        required: true,
        match: /(:?\+[Il]* ?)?[\d()–-][\d ()\-"–OОli_|]{6,20}[\dOОli|]\d/,
      },
    },
  ],
  nickName: {
    type: [String],
  },
  created: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  enabled: {
    type: Boolean,
    required: true,
    default: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  balance: { type: Number, default: 1000 },

  // Add a cart field
  cart: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true,
      }, // Reference to the item in another collection
      title: { type: String, required: true }, // Title of the item
      price: { type: Number, required: true }, // Price of the item
      quantity: { type: Number, required: true, min: 1 }, // Quantity of the item
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
