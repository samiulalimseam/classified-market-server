const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categorySchema = new Schema({
  name: {
    type: String,
   
  },
  tags : {
    type : [String],

  }
});
module.exports = mongoose.model("categoriesv2", categorySchema)