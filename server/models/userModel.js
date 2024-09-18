const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "user must have an email"],
      lowercase: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "{VALUE} is not a valid email",
      },
    },
    name: {
      type: String,
      required: [true, "user must have a name"],
    },
    password: {
      type: String,
      required: [true, "user must have a password"],
      minlength: [8, "password must have atlease 8 characters"],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "please re-enter the password"],
      minlength: [8, "password must have atlease 8 characters"],
      validate: {
        //only validates on CREATE and SAVE not with UPDATE
        validator: function (val) {
          return this.password === val;
        },
        message: "password and confirm password did not match",
      },
    },
    courses: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Course",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.checkPassword = async function (
  candidatePassword,
  hashedPassword
) {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  if (this.isGoogleSignUp) {
    this.password = undefined;
    this.confirmPassword = undefined;
    next();
  }

  this.password = await bcrypt.hash(this.password, 12); //hash(string to hash, salt)
  this.confirmPassword = undefined;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
