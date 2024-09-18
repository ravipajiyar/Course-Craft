const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const axios = require("axios");

const signJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPRIES_IN,
  });
};

const createSendToken = (statusCode, user, res) => {
  const token = signJWT(user.id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(
      new AppError(400, "both email and password is required to login")
    );
  const user = await User.findOne({ email }).select("+password");
  const validPassword = user
    ? await user.checkPassword(password, user.password)
    : false;
  if (!validPassword || !user) {
    return next(new AppError(401, "email or password is incorrect"));
  }

  createSendToken(200, user, res);
});

exports.signup = catchAsync(async (req, res, next) => {
  const userData = req.body;
  console.log(userData);
  const user = await User.create(userData);
  if (!user) {
    return next(new AppError(500, "something went wrong, please try again"));
  }

  const token = signJWT(user.id);
  user.password = undefined;
  res.status(201).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

exports.generateQuestions = catchAsync(async (req, res, next) => {
  const { topic } = req.body;
  console.log(topic);

  const response = await axios.post(
    "http://localhost:3001/generate-questions",
    { topic: topic }
  );

  const advanced = response.data.questions.advanced;
  const basic = response.data.questions.basic;
  const intermediate = response.data.questions.intermediate;
  const data = { basic, intermediate, advanced };

  res.status(201).json({
    status: "success",
    data: data,
  });
});
