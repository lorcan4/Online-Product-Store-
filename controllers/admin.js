const path = require("path");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");
const fs = require("fs");

// Connection
const Connection = require("../models/User");

// signup Page GET && POST
const adminFile = path.join(__dirname, "../views/admin.ejs");
exports.admin__get = (req, res) => {
  const sql = "SELECT * FROM ProductsData";
  Connection.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching ProductsData:", err);
      return res.status(500).send("Failed to fetch ProductsData");
    }
    res.render(adminFile, {
      success: req.flash("success"),
      error: req.flash("error"),
      result,
    });
  });
};

exports.admin__post = async (req, res) => {
  const iDProduct = uuidv4();
  const imagesUrl = req.file.filename;
  const { descriptions, prices, categories, file } = req.body;
  const sql =
    "INSERT INTO  ProductsData (iDProduct,imagesUrl, descriptions,prices, categories) VALUES (?, ?, ?, ?, ?)";
  const value = [iDProduct, imagesUrl, descriptions, prices, categories];
  Connection.query(sql, value, async (err) => {
    if (err) {
      console.error("Error to add products:", err);
      return req.flash("error", "Problem Entering");
    }
    req.flash("success", "item has been added");
    res.redirect("/admin");
  });
};

exports.admin__Delete = async (req, res) => {
  const iDProduct = req.params.id;
  const imagesUrl = req.body.imagesUrl;
  const sql = "DELETE FROM ProductsData WHERE iDProduct = ?";
  Connection.query(sql, [iDProduct], async (err) => {
    if (err) {
      console.error("Error to Delete:", err);
      return req.flash("error", "Problem in  Delete");
    }
    const imagePath = path.join(__dirname, "../storage-img", imagesUrl);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting the image:", err);
        return;
      }
      console.log("Image deleted successfully.");
      req.flash("success", "Deleted is successfully");
      res.redirect("/admin");
    });
  });
};
