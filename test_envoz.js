// console.log("test_envoz");
// const bcrypt = require("bcrypt");
// let hp = {};
// const hashedPassword = bcrypt
//   .hash("Anik1995$", 3)
//   .then((pass) => ((hp.pass = pass), console.log(hp)));

// setTimeout(() => {
//   const validatedPassword = bcrypt.compare("Anik1995$", hp.pass);
//   validatedPassword.then((res) => console.log(res));
// }, 1000);

// jwt
const jwt = require("jsonwebtoken");
let a = jwt.sign({ name: "ANIK" }, "a4534534534sdsda3", {
  expiresIn: "24hr",
});
console.log(a);
