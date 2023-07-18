const express = require("express");
const router = express.Router();

// internal imports
const { getLogin, login } = require("../controller/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const {
  doLoginValidators,
  doLoginValidationHandler,
} = require("../middlewares/login/loginValidators");

const page_title = "Login";
router.get("/", decorateHtmlResponse(page_title), getLogin);

// Process Login
router.post(
  "/",
  decorateHtmlResponse(page_title),
  doLoginValidators,
  doLoginValidationHandler,
  login
);

module.exports = router;
