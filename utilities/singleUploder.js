// external imports
const multer = require("multer");
const path = require("path");
const createError = require("http-errors");

function uploader(subfolder_path, allowed_file_types, max_size, err_msg) {
  // File Upload Path
  const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}/`;

  //   Define the Storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();
      cb(null, fileName + fileExt);
    },
  });

  //Prepare the multer upload object
  const upload = multer({
    storage: storage,
    limits: { fileSize: max_size },
    fileFilter: (req, file, cb) => {
      allowed_file_types.includes(file.mimetype)
        ? cb(null, true)
        : cb(createError(err_msg));
    },
  });

  return upload;
}

module.exports = uploader;
