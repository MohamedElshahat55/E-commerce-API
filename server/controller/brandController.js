const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Brand = require("../models/brandModel");
const apiError = require("../utils/ApiError");

// @desc : Get All Brands
// @route : GET /api/v1/brands
// @access : Public

exports.getAllBrands = asyncHandler(async (req, res) => {
  //pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const brands = await Brand.find({}).skip(skip).limit(limit);
  res.status(200).json({
    results: brands.length,
    status: "success",
    data: brands,
  });
});

// @desc : Get A Specific Brand
// @route : GET /api/v1/brands/:id
// @access : Private

exports.getSpecificBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);
  if (!brand) {
    return next(new apiError(`no Brand found for this id:${id}`), 404);
  }
  res.status(200).json({ status: "success", data: brand });
});

// @desc    Create Brand
// @route   POST  /api/v1/brands
// @access  Private
exports.createBrand = asyncHandler(async (req, res) => {
  const { name, image } = req.body;
  const brand = await Brand.create({
    name,
    image,
    slug: slugify(name),
  });
  res.status(201).json({ data: brand });
});

// @desc : Update Brand
// @route : PUT /api/v1/brands/:id
// @access : Private

exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const brand = await Brand.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!brand) {
    return next(new apiError(`no brand found for this id:${id}`), 404);
  }
  res.status(200).json({ status: "success", data: brand });
});

// @desc : Delete subcategory
// @route : DELETE /api/v1/brands/:id
// @access : Private
exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findOneAndDelete(id);
  if (!brand) {
    return next(new apiError(`no brand found for this id:${id}`), 404);
  }
  res.status(200).json({ status: "success" });
});
