const { signUp, login } = require("../controller/authController");
const {
  signupValidator,
  loginValidator,
} = require("../utils/validators/authValidator");

const router = require("express").Router();

// /api/v1/auth/signup
router.route("/signup").post(signupValidator, signUp);
// /api/v1/auth/login
router.route("/login").post(loginValidator, login);

module.exports = router;
