const express = require("express");
const path = require("path");
const multer = require("multer");
const routes = express.Router();
const isAuthenticated = require("../middleware/authmiddleware");
const upload = require("../controllers/upload");
const { admin__get, admin__post , admin__Delete} = require("../controllers/admin");

routes.route("/admin").get(isAuthenticated, admin__get);
routes.route("/Add-New-Product").post(isAuthenticated, upload.single('file'), admin__post);
routes.route("/delete/:id").post(isAuthenticated, admin__Delete);

module.exports = routes;
