// external imports
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const path = require("path");
const { unlink } = require("fs");

// internal Imports
const User = require("../../models/People");

// add User
const addUserValidators = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is Required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid Email Address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value }); // if no email: user=null
        if (user) {
          throw createError("Email Already Exist");
        }
      } catch (error) {
        throw createError(error.message);
      }
    }),
  check("mobile")
    .isMobilePhone("bn-BD", {
      strictMode: true,
    })
    .withMessage(
      "Mobile number must be a valid Bangladeshi mobile number start with +880 .."
    )
    .custom(async (value) => {
      try {
        const userPhone = await User.findOne({ phone: value });
        if (userPhone) {
          throw createError("Phone Number already in use! Try another");
        }
      } catch (error) {
        throw createError(error.message);
      }
    }),
  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
    ),
];

const addUserValidationHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    if (req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(
        path.join(__dirname, `../../public/uploads/avatars/${filename}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }
    // response errors
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  addUserValidators,
  addUserValidationHandler,
};
