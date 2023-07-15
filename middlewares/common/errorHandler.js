const createError = require("http-errors");

// 404 no found handler
const notFoundHandler = (req, res, next) => {
  next(createError(404, "Sorry, Not Found"));
};

// Default Error Handler
// Sending both json and html response
const errorHandler = (err, req, res, next) => {
  res.locals.errors =
    process.env.NODE_ENV === "development" ? err : { message: err.message };
  res.status(err.status || 500);
  console.log(res.locals);
  if (res.locals.html) {
    //html response
    res.render("error", { title: "Error Page" });
  } else {
    //json response
    res.json(res.locals.errors);
  }
};

module.exports = { notFoundHandler, errorHandler };
