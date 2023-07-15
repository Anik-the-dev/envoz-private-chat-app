const express = require("express");
const router = express.Router();

// internal imports
const { getUser } = require("../controller/userController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

router.get("/", decorateHtmlResponse("User"), getUser);
router.post("/", () => {});

module.exports = router;
