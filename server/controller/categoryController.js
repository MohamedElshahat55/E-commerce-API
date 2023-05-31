const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const apiError = require('../utils/ApiError')

// @desc : Get List of categories
// @route : GET /api/v1/categories
// @access : Public
exports.getCategories = asyncHandler(async (req, res) => {
  //pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const categories = await Category.find({}).skip(skip).limit(limit);
  res
    .status(200)
    .json({results: categories.length, status: "success", data: categories});
});

// @desc : Get List of categories
// @route : GET /api/v1/category/:id
// @access : Private
exports.getSpecificCategory = asyncHandler(async (req, res,next) => {
  const {id} = req.params;
  const category = await Category.findById(id);
  if (!category) {
    return next(new apiError( `no category found for this id:${id}`),404)
  }
  res.status(200).json({status: "success", data: category});
});

// @desc : Create a new category
// @route : POST /api/v1/category
// @access : Private
exports.craeteCategory = asyncHandler(async (req, res) => {
  const {name} = req.body;
  const category = await Category.create({name, slug: slugify(name)})
    res.status(201)
    .json({category});
});

// @desc : Update category
// @route : PUT /api/v1/category/:id
// @access : Private

exports.updateCategory = asyncHandler(async (req, res,next) => {
  const {id} = req.params;
  const {name} = req.body;
  const category = await Category.findByIdAndUpdate({_id:id}, {name}, {new: true});
  if (!category) {
    return next(new apiError( `no category found for this id:${id}`),404)
  }
  res.status(200).json({status: "success", data: category});
});

// @desc : Delete category
// @route : DELETE /api/v1/category/:id
// @access : Private
exports.deleteCategory = asyncHandler(async (req, res,next) => {
  const {id} = req.params;
  const category = await Category.findOneAndDelete(id);
  if (!category) {
    return next(new apiError( `no category found for this id:${id}`),404)
  }
  res.status(200).json({status: "success"});
});
