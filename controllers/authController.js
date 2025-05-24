const path = require("path");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
// Connection
const Connection = require("../models/User");

// Login Page GET && POST
const LoginFile = path.join(__dirname, "../views/login.ejs");
exports.login__get = (req, res) => {
  res.render(LoginFile, {
    success: req.flash("success"),
    error: req.flash("error"),
  });
};
exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM account";
  Connection.query(sql, async (err, result) => {
    if (err) {
      console.error("Error fetching account:", err);
      return res.status(500).send("Failed to fetch account");
    }

    const user = result.find((data) => data.email === email);
    if (!user) {
      req.flash("error", "Invalid email or password.");
      return res.redirect("/login");
    }
    const isMatch = await bcrypt.compare(password, user.hashed);

    if (user.email === "mcdrissvk@gmail.com" && isMatch) {
      req.session.userId = user.id;
      req.flash("success", "Logged in successfully.");
      return res.redirect("/admin");
    } else if (isMatch) {
      req.session.userId = user.id;
      req.flash("success", "Logged in successfully.");
      return res.redirect("/dashboard");
    } else {
      req.flash("error", "Invalid email or password.");
      return res.redirect("/login");
    }
  });
};

// signup Page GET && POST
const signupFile = path.join(__dirname, "../views/signup.ejs");
exports.signup__get = (req, res) => {
  res.render(signupFile, {
    success: req.flash("success"),
    error: req.flash("error"),
  });
};

exports.signup__post = async (req, res) => {
  // Id Function
  const id = uuidv4();
  const { email, password, FirstName, LastName } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const sql =
    "INSERT INTO account (id ,email, hashed,FirstName,LastName) VALUES (?,?,?,?,?)";
  const Value = [id, email, hashed, FirstName, LastName];
  Connection.query(sql, Value, (err) => {
    if (err) {
      console.log("No Data Valid");
      res.status(500).json("No Data Valid");
      req.flash("error", "Signup is not successfully.");
      return;
    }
    req.session.userId = id;
    console.log(" Data Valid");
    req.flash("success", "Signup in successfully.");
    res.redirect("/dashboard");
  });
};
// dashboard GET
const dashboardFile = path.join(__dirname, "../views/dashboard.ejs");
exports.dashboard__get = async (req, res) => {
  const userId = req.session.userId;
  const sql = "SELECT * FROM account WHERE id = ?";
  Connection.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching user data:", err);
      return res.status(500).send("Failed to fetch user data");
    }
    const user = result[0]; // لأنه يرجع Array
    const sql = "SELECT * FROM ProductsData";
    Connection.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching ProductsData:", err);
        return res.status(500).send("Failed to fetch ProductsData");
      }
      res.render(dashboardFile, {
        success: req.flash("success"),
        error: req.flash("error"),
        result,
        user,
      });
    });
    // anther One
  });
};
// logout
exports.logout__get = async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
