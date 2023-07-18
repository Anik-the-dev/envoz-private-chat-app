const People = require("../models/People");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Login Page
function getLogin(req, res, next) {
  res.render("index");
}

//  do login
// check user( by user input) if pass: generate token, save to cookie, send the cookie, inbox render
async function login(req, res, next) {
  console.log("req", req.body.username);
  try {
    const user = await People.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });
    if (user && user._id) {
      const validatedPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (validatedPassword) {
        // userdata
        const payload = {
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          role: "user",
        };
        // generate token
        const token = jwt.sign(payload, process.env.TOKEN_KEY_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        // set cookie and send cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          signed: true,
          httpOnly: true,
          maxAge: process.env.JWT_EXPIRY,
        });
        // Set loggedIn user locals identifier
        res.locals.loggedInUser = payload;
        // render inbox page
        res.render("inbox");
      } else {
        throw createError("Login failed! Please try again.");
      }
    } else {
      throw createError("Login failed! Please try again.");
    }
  } catch (error) {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
}
module.exports = {
  getLogin,
  login,
};
