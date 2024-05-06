// Assuming you have models defined for categories, products, users, orders, account types, locations, and conditions.

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Schemas
const categorySchema = new Schema({
  // Define schema fields
});

const productSchema = new Schema({
  // Define schema fields
});

const userSchema = new Schema({
  // Define schema fields
});

const orderSchema = new Schema({
  // Define schema fields
});

const accountTypeSchema = new Schema({
  // Define schema fields
  title : {
    type : String
  }
});

const locationSchema = new Schema({
  // Define schema fields
});

const conditionSchema = new Schema({
  // Define schema fields
});

// Define Models
const Category = mongoose.model("Category", categorySchema);
const Product = mongoose.model("Product", productSchema);
const User = mongoose.model("User", userSchema);
const Order = mongoose.model("Order", orderSchema);
const AccountType = mongoose.model("AccountType", accountTypeSchema);
const Location = mongoose.model("Location", locationSchema);
const Condition = mongoose.model("Condition", conditionSchema);

module.exports = {
  Category,
  Product,
  User,
  Order,
  AccountType,
  Location,
  Condition
};
