const {
  createBrand,
  getAllBrands,
  getSpecificBrand,
  updateBrand,
  deleteBrand,
} = require("../controller/brandController");
const {
  getBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validators/validatorBrand");

const router = require("express").Router();

// /api/v1/brands
router.route("/").post(createBrand).get(getAllBrands);
// /api/v1/brands/:id
router
  .route("/:id")
  .get(getBrandValidator, getSpecificBrand)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

module.exports = router;
