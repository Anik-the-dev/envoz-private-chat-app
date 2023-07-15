const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();

// Database Connection
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
  console.log("Database Connectioon Successfuly!");
}

// Request Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View Engine Set
app.set("view engine", "ejs");

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Parse Cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// Listen Port
app.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});
