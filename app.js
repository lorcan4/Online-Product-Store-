// Online Product Store
const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const mysql = require("mysql");
const multer = require("multer");
const dotenv = require("dotenv");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cors = require("cors");
// Import Folder /----/
// Connection 
const Connection = require("./models/User")
// Middleware to protect dashboard
const isAuthenticated = require("./middleware/authmiddleware");

// Import Folder /----/
// App && PORT
const app = express();
const PORT = 3300;
// bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// Session
app.use(
  session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: true,
  })
);
// Middleware Flash
app.use(flash());
// static
app.use("/storage-img", express.static(path.join(__dirname, "storage-img")));

// routes
const auth = require("./Routes/auth")
const admin_auth = require("./Routes/admin-auth")
app.use("/",auth)
app.use("/",admin_auth)


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
