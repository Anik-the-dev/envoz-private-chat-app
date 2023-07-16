const express = require("express");
const router = express.Router();

// internal imports
const { getUser } = require("../controller/userController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");

router.get("/", decorateHtmlResponse("User"), getUser);
router.post("/", avatarUpload);

module.exports = router;
