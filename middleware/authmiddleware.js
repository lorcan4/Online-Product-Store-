
function isAuthenticated(req, res, next) {
    if (req.session.userId) return next();
    req.flash("error", "You must log in first.");
    res.redirect("/login");
  }

  module.exports = isAuthenticated