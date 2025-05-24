const path = require("path")
const multer = require("multer");
// Multer DiskStorage
const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../storage-img"));
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now();
      cb(
        null,
        file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
      );
    },
  });
  const upload = multer({ storage: Storage });
  module.exports = upload;