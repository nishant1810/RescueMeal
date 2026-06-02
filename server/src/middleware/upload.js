import multer from "multer";

import path from "path";

/*
========================================
STORAGE
========================================
*/

const storage =
  multer.diskStorage({
    destination: (
      req,
      file,
      cb
    ) => {
      cb(null, "uploads/");
    },

    filename: (
      req,
      file,
      cb
    ) => {
      cb(
        null,
        Date.now() +
          path.extname(
            file.originalname
          )
      );
    },
  });

/*
========================================
FILE FILTER
========================================
*/

const fileFilter = (
  req,
  file,
  cb
) => {
  const allowedTypes =
    /jpg|jpeg|png|webp/;

  const extname =
    allowedTypes.test(
      path
        .extname(
          file.originalname
        )
        .toLowerCase()
    );

  const mimetype =
    allowedTypes.test(
      file.mimetype
    );

  if (
    extname &&
    mimetype
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only images are allowed"
      )
    );
  }
};

/*
========================================
UPLOAD
========================================
*/

const upload = multer({
  storage,

  fileFilter,
});

export default upload;