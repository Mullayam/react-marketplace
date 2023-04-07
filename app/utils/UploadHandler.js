const multer = require("multer");
const fs = require("fs");
const commonPath = "./public/uploads";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let baseURL = req._parsedUrl.pathname;
    switch (baseURL) {
      case "/upload/avatar":
        cb(null, `${commonPath}/avatars`);
        break;

      default:
        cb(null, `${commonPath}`);
        break;
    }
  },
  filename: function (res, file, cb) {
    const rename = file.originalname
      .replace(/[^a-zA-Z0-9.]/g, "")
      .toLowerCase();

    if (fs.existsSync(`${rename}`)) {
      return res.json({ return: false, message: "File already exists" });
    } else {
      cb(null, rename); // Date.now() + "-" +
    }
  },
});

const storage2 = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const ImgUpload = multer({ storage });

module.exports = { storage2, ImgUpload };
