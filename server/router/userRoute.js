const {
  createUser,
  getAllUsers,
  getSpecificUser,
  updateUser,
  deleteUser,
  changeUserPassword,
} = require("../controller/userController");
const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  changePasswordValidator,
  deleteUserValidator,
} = require("../utils/validators/validatorUser");

const router = require("express").Router();

router.put("/changepassword/:id", changePasswordValidator, changeUserPassword);

// /api/v1/users
router.route("/").post(createUserValidator, createUser).get(getAllUsers);
// /api/v1/users/:id
router
  .route("/:id")
  .get(getUserValidator, getSpecificUser)
  .put(updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
