const mongoose = require("mongoose");

// STEP 2 - DEFINE THE SCHEMA
// create a schema for the item table/document
const itemSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  color: { type: String, required: true },
  rating: { type: Number, required: true },
  picture: { type: String, required: true }, // URL to image
  title: { type: String, required: true },
  quantity: { type: Number, required: true },
  typeOfItem: { type: String, required: true },
});

// STEP 3 - CREATE THE MODEL
// The model is what we use to do the CRUD operations against our collection. It is the LIVE object
// use item schema to create item model
module.exports = mongoose.model("Item", itemSchema);
