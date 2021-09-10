const multer = require("multer");

const uploadImageSingle = (pathForModel) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `./public/${pathForModel}`);
    }, //đường dẫn thư mục để lưu file
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  });
  const upload = multer({ storage });
  return upload.single("avatar");
};

module.exports = {
  uploadImageSingle,
};
