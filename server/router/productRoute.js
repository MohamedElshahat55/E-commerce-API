const {
    createProduct,
    getAllProducts,
    getSpecificProduct,
    updateProduct,
    deleteProduct,
  } = require("../controller/productController");
  const {
    createProductValidator,
    getProductValidator,
    deleteProductValidator,
    updateProductValidator
  } = require("../utils/validators/validatorProduct");
  
  const router = require("express").Router();
  
  // /api/v1/products
  router.route("/").post(createProductValidator,createProduct).get(getAllProducts);
  // /api/v1/products/:id
  router
    .route("/:id")
    .get(getProductValidator, getSpecificProduct)
    .put(updateProductValidator, updateProduct)
    .delete(deleteProductValidator, deleteProduct);
  
  module.exports = router;
  