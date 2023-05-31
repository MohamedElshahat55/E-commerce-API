const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const apiError = require("../utils/ApiError");
const slugify = require("slugify");

// @desc : Get All Products
// @route : GET /api/v1/products
// @access : Public

exports.getAllProducts = asyncHandler(async (req, res) => {
  //pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const products = await Product.find({}).skip(skip).limit(limit);
  res.status(200).json({
    results: products.length,
    status: "success",
    data: products,
  });
});

// @desc : Get A Specific Product
// @route : GET /api/v1/products/:id
// @access : Private

exports.getSpecificProduct = asyncHandler(async (req, res, next) => {
  const {id} = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return next(new apiError(`no product found for this id:${id}`), 404);
  }
  res.status(200).json({status: "success", data: product});
});

// @desc    Create Product
// @route   POST  /api/v1/products
// @access  Private
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const product = await Product.create(req.body);
  res.status(201).json({data: product});
});

// @desc : Update Product
// @route : PUT /api/v1/products/:id
// @access : Private

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const {id} = req.params;
  req.body.slug = slugify(req.body.title);
  const product = await Product.findByIdAndUpdate({_id: id}, req.body, {
    new: true,
  });
  if (!product) {
    return next(new apiError(`no product found for this id:${id}`), 404);
  }
  res.status(200).json({status: "success", data: product});
});

// @desc : Delete Product
// @route : DELETE /api/v1/products/:id
// @access : Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const {id} = req.params;
  const product = await Product.findOneAndDelete(id);
  if (!product) {
    return next(new apiError(`no product found for this id:${id}`), 404);
  }
  res.status(200).json({status: "success"});
});
