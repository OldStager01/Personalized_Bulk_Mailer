const fs = require("fs");
const multer = require("multer");
const path = require("path");

const uploadDirectory = "./uploads";
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}
const storageCSV = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      cb(null, uploadDirectory);
    } catch (error) {
      cb(new Error("Error uploading file"));
    }
  },
  filename: (req, file, cb) => {
    try {
      cb(null, `file${path.extname(file.originalname)}`);
    } catch (error) {
      cb(new Error("Error uploading file"));
    }
  },
});

const uploadCSV = multer({ storage: storageCSV });

module.exports = uploadCSV;
