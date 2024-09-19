const express = require("express");
const authController = require("../controller/authController");
const router = express.Router();

router.route("/login").post(authController.login);
router.route("/signup").post(authController.signup);
router.route("/generate-questions").post(authController.generateQuestions);
router.route("/generate-module").post(authController.generateModule);
router.route("/get-notes").post(authController.getNotes);

module.exports = router;
