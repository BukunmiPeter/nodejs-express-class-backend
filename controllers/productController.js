const cloudinary = require("../config/cloudinary");
const productService = require("../services/productService");

exports.create = async (req, res) => {
  try {
    console.log("req.file", req.file);
    console.log("req.body", req.body);
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "products",
    });

    console.log(req.body);
    const product = await productService.createProduct({
      ...req.body,
      image: result.secure_url,
      createdBy: req.user._id,
    });

    console.log(product);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAll = async (_, res) => {
  const products = await productService.getAllProducts();
  res.json(products);
};

exports.getOne = async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  product ? res.json(product) : res.status(404).json({ message: "Not found" });
};

exports.update = async (req, res) => {
  const product = await productService.updateProduct(req.params.id, req.body);
  product ? res.json(product) : res.status(404).json({ message: "Not found" });
};

exports.remove = async (req, res) => {
  const product = await productService.deleteProduct(req.params.id);
  product
    ? res.json({ message: "Deleted" })
    : res.status(404).json({ message: "Not found" });
};
