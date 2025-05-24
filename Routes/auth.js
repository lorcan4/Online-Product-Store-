const express = require("express");
const path = require("path");
const routes = express.Router();
const isAuthenticated = require("../middleware/authmiddleware");
// import
const {
  login__get,
  login_post,
  signup__get,
  signup__post,
  dashboard__get,
  logout__get,
} = require("../controllers/authController");
routes.route("/login").get(login__get).post(login_post);
routes.route("/signup").get(signup__get).post(signup__post);
routes.route("/dashboard").get(isAuthenticated, dashboard__get);
routes.route("/logout").get(logout__get);

module.exports = routes;
