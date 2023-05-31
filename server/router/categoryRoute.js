const {
  craeteCategory,
  getCategories,
  getSpecificCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/categoryController");
const {
  getCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/validatorCategory");
const subCategoryRouter = require("./subCategoryRoute");
const authController = require("../controller/authController");
const router = require("express").Router();

router.use("/:categoryId/subcategories", subCategoryRouter);

// /api/v1/categories
router
  .route("/")
  .post(authController.protect, craeteCategory)
  .get(getCategories);
// /api/v1/categories/:id
router
  .route("/:id")
  .get(getCategoryValidator, getSpecificCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;
