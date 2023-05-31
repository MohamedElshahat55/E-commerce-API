const { createSubCategory, getSubCategories, getSpecificSubCategory, updateSubCategory, deleteSubCategory } = require('../controller/subCategoryController')
const { createSubCategoryValidator, getSubCategoryValidator, updateSubCategoryValidator, deleteSubCategoryValidator } = require('../utils/validators/validatorSubCategory')


// merge params allow you to access params from other routers
const router = require('express').Router({mergeParams:true})


// /api/v1/subcategories
router.route('/').post(createSubCategoryValidator,createSubCategory).get(getSubCategories)
// /api/v1/subcategories/:id
router.route('/:id').get(getSubCategoryValidator,getSpecificSubCategory).put(updateSubCategoryValidator,updateSubCategory).delete(deleteSubCategoryValidator,deleteSubCategory)

module.exports = router