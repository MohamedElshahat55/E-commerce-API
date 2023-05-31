const mongoose = require("mongoose");

//---------------CREATE-BRAND-SCHEMA------------------ \\
const BrandSchmea = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, "brand must be unique"],
      minlength: [2, "To short brand name"],
      maxlength: [32, "To long brand name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
      required: [true, "image required"],
    },
  },
  {timestamps: true}
);

const Brand = mongoose.model("Brand", BrandSchmea);

module.exports = Brand;
