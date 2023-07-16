const uploader = require("../../utilities/singleUploder");

function avatarUpload(req, res, next) {
  const upload = uploader(
    "avatars",
    ["image/jpeg", "image/jpg", "image/png"],
    50000000,
    "Only .jpg, jpeg or .png format allowed!"
  );

  // Call the middleware func manually
  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
}
module.exports = avatarUpload;
