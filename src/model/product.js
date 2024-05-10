const { timeStamp } = require('console');
const timespan = require('jsonwebtoken/lib/timespan');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    default: 0,
    min: 0,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    // Add more categories as needed
  },
 
},[{timeStamp: true}]);



module.exports = mongoose.model('productsv2', productSchema);
