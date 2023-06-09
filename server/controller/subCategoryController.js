const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const SubCategory = require("../models/subCategoryModel");
const apiError = require("../utils/ApiError");

// Nested Routes
// /api/v1/categories/:categoryId/subcategories


// @desc : Get List of subcategories
// @route : GET /api/v1/subcategories
// @access : Public

exports.getSubCategories = asyncHandler(async (req, res) => {
  //pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

let filterObject = {}
if(req.params.categoryId) filterObject = {category:req.params.categoryId}

  const subCategories = await SubCategory.find(filterObject).skip(skip).limit(limit)
  // .populate({ path: 'category', select: 'name -_id' });
  res
    .status(200)
    .json({
      results: subCategories.length,
      status: "success",
      data: subCategories,
    });
});

// @desc : Get List of subcategories
// @route : GET /api/v1/subcategories/:id
// @access : Private


exports.getSpecificSubCategory = asyncHandler(async (req, res, next) => {
  const {id} = req.params;
  const subCategory = await SubCategory.findById(id)
  if (!subCategory) {
    return next(new apiError(`no category found for this id:${id}`), 404);
  }
  res.status(200).json({status: "success", data: subCategory});
});
// @desc    Create subCategory
// @route   POST  /api/v1/subcategories
// @access  Private
exports.createSubCategory = asyncHandler(async (req, res) => {
  const {name, category} = req.body;
  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({data: subCategory});
});

// @desc : Update subcategory
// @route : PUT /api/v1/subcategory/:id
// @access : Private

exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const {id} = req.params;
  const {name, category} = req.body;
  const subcategory = await SubCategory.findByIdAndUpdate(
    {_id: id},
    {name, slug: slugify(name), category},
    {new: true}
  );
  if (!subcategory) {
    return next(new apiError(`no category found for this id:${id}`), 404);
  }
  res.status(200).json({status: "success", data: subcategory});
});

// @desc : Delete subcategory
// @route : DELETE /api/v1/subcategory/:id
// @access : Private
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const {id} = req.params;
  const subCategory = await SubCategory.findOneAndDelete(id);
  if (!subCategory) {
    return next(new apiError(`no category found for this id:${id}`), 404);
  }
  res.status(200).json({status: "success"});
});
