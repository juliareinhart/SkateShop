const mongoose = require("mongoose");

// STEP 1 - ESTABLISH THE CONNECTION TO MONGODB
// connect to the database, create the schema for collections/tables and insert initial store data to seed the database if items don't exist yet
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
