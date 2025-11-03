const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String, // url or base64
  category: String,
  stock: { type: Number, default: 100 }
});

module.exports = mongoose.model("Product", ProductSchema);
