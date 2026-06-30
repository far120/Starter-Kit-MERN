// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // مسار حقيقي ثابت
// const uploadPath = path.join(__dirname, '../uploads');

// // إنشاء الفولدر لو مش موجود
// if (!fs.existsSync(uploadPath)) {
//   fs.mkdirSync(uploadPath, { recursive: true });
// }

// // storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + '-' + file.originalname;
//     cb(null, uniqueName);
//   }
// });

// // filter
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only images allowed'), false);
//   }
// };

// // middleware 
// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 1024 * 1024 * 2 }
// });

// module.exports = upload;


const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

// ==============================
// Create Upload Folder
// ==============================

const uploadPath = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// ==============================
// Allowed Image Types
// ==============================

const allowedMimeTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];

// ==============================
// Storage
// ==============================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);

    const uniqueName =
      crypto.randomUUID() + "-" + Date.now() + extension;

    cb(null, uniqueName);
  },
});

// ==============================
// File Filter
// ==============================

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    return cb(null, true);
  }

  cb(new Error("Only JPG, JPEG, PNG, WEBP, GIF and SVG images are allowed."));
};

// ==============================
// Multer Middleware
// ==============================

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB
    files: 1,
  },
});

module.exports = upload;


//// usage example

//// single image upload
// const upload = require("../middlewares/upload");
// router.post("/users", upload.single("image"), createUser);

//// multiple images upload
// const upload = require("../middlewares/upload");
// router.post("/users", upload.array("images", 5), createUser);