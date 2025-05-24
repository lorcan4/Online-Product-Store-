const mysql = require("mysql");
// Connection MYSQL
const Connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Product",
});

Connection.connect((err) => {
  if (err) {
    console.error("❌ Fault in MYSQL Connecting :", err.message);
    return;
  }
  console.log("✅ Connecting");
});

module.exports = Connection;
