const Product = require("../models/Product");

exports.createProduct = (data) => Product.create(data);
exports.getAllProducts = () => Product.find();
exports.getProductById = (id) => Product.findById(id);
exports.updateProduct = (id, data) =>
  Product.findByIdAndUpdate(id, data, { new: true });
exports.deleteProduct = (id) => Product.findByIdAndDelete(id);
