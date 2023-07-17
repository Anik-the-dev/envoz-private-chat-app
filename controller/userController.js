// external imports
const bcrypt = require("bcrypt");
const { unlink } = require("fs");
const path = require("path");

// internal imports
const User = require("../models/People");

// Get User
async function getUser(req, res, next) {
  try {
    const users = await User.find();
    res.render("users", { users: users }); // users.ejs
  } catch (error) {
    next(error);
  }
}

// Post User
async function addUser(req, res, next) {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  if (req.files && req.files > 0) {
    newUser = new User({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashedPassword,
    });
  } else {
    newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
  }
  // save user or send error
  try {
    const result = await newUser.save();
    res.status(200).json({
      message: "User Added Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error Occured!",
        },
      },
    });
  }
}

// Delete User
async function removeUser(req, res, next) {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (deletedUser.avatar) {
      unlink(
        path.join(
          __dirname,
          `/../public/uploads/avatars/${deletedUser.avatar}`
        ),
        (err) => {
          if (err) console.log(err);
        }
      );
    }
    res.status(200).json({
      message: "User was removed successfully!",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Could not delete the user!",
        },
      },
    });
  }
}
module.exports = {
  getUser,
  addUser,
  removeUser,
};
