const slugify = require("slugify");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const apiError = require("../utils/ApiError");

// @desc : Get All Users
// @route : GET /api/v1/users
// @access : Private/Admin

exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json({
    results: users.length,
    status: "success",
    data: users,
  });
});

// @desc : Get A Specific User
// @route : GET /api/v1/Users/:id
// @access : Private/Admin

exports.getSpecificUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return next(new apiError(`no user found for this id:${id}`), 404);
  }
  res.status(200).json({ status: "success", data: user });
});

// @desc    Create User
// @route   POST  /api/v1/users
// @access  Private/Admin
exports.createUser = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ data: user });
});

// @desc : Update User
// @route : PUT /api/v1/users/:id
// @access : Private/Admin

exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      phone: req.body.phone,
      email: req.body.email,
      profileImage: req.body.profileImage,
      role: req.body.role,
    },
    {
      new: true,
    }
  );
  if (!user) {
    return next(new apiError(`no user found for this id:${id}`), 404);
  }
  res.status(200).json({ status: "success", data: user });
});

exports.changeUserPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangeAt: Date.now(),
    },
    {
      new: true,
    }
  );
  if (!user) {
    return next(new apiError(`no user found for this id:${id}`), 404);
  }
  res.status(200).json({ status: "success", data: user });
});

// @desc : Delete User
// @route : DELETE /api/v1/users/:id
// @access : Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOneAndDelete(id);
  if (!user) {
    return next(new apiError(`no user found for this id:${id}`), 404);
  }
  res.status(200).json({ status: "success" });
});
