const mongoose = require("mongoose");

// STEP 2 - DEFINE THE SCHEMA
// create an order schema for the order table/document
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderDate: { type: Date, default: Date.now },
});

// STEP 3 - CREATE THE MODEL
// The model is what we use to do the CRUD operations against our collection. It is the LIVE object
// use order schema to create order model
module.exports = mongoose.model("Order", orderSchema);
