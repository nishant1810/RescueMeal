import multer from "multer";

import {
  CloudinaryStorage,
} from "multer-storage-cloudinary";

import cloudinary
from "../config/cloudinary.js";

/*
========================================
CLOUDINARY STORAGE
========================================
*/

const storage =
  new CloudinaryStorage({
    cloudinary,

    params: async (
      req,
      file
    ) => ({
      folder:
        "RescueMeal",

      allowed_formats: [
        "jpg",
        "jpeg",
        "png",
        "webp",
      ],

      public_id:
        Date.now() +
        "-" +
        file.originalname,
    }),
  });

/*
========================================
UPLOAD MIDDLEWARE
========================================
*/

const upload =
  multer({
    storage,
  });

export default upload;