const mongoose = require("mongoose");

// STEP 2 - DEFINE THE SCHEMA
// create an orderItem schema for the order item table/document
const orderItemSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
  quantity: { type: Number, required: true },
  priceEach: { type: Number, required: true },
});

// STEP 3 - CREATE THE MODEL
// use order item schema to create order item model
module.exports = mongoose.model("OrderItem", orderItemSchema);
