const express = require("express");
const router = express.Router();

// internal imports
const {
  getUser,
  addUser,
  removeUser,
} = require("../controller/userController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/users/userValidators");

router.get("/", decorateHtmlResponse("User"), getUser);
router.post(
  "/",
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);

// delete User
router.delete("/:id", removeUser);

module.exports = router;
