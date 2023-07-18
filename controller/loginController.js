const People = require("../models/People");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Login Page
function getLogin(req, res, next) {
  res.render("index");
}

//  do login
// validate user( by user input) if pass: generate token, save to cookie, send the cookie, inbox render
async function login(req, res, next) {
  const user = await People.findOne({
    $or: [{ email: res.body.username }, { mobile: res.body.username }],
  });
  if (user && user._id) {
    const validatedPassword = await bcrypt.compare(
      res.body.password,
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
        expiresIn: "24hr",
      });

      // set cookie and send cookie
    }
  }
}
module.exports = {
  getLogin,
};
