const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//---------------CREATE-USER-SCHEMA------------------ \\
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name required"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      unique: [true, "email must be unique"],
      required: [true, "email required"],
    },
    phone: String,
    profileImage: String,
    password: {
      type: String,
      required: [true, "password required"],
    },
    passwordChangeAt: Date,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  //-HASHING-USER-PASSWORD-----------\\
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
