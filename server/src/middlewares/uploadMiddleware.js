 import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (
    req,
    file,
    cb
  ) => {
 

const uploadPath =
  path.join(
    process.cwd(),
    "public",
    "uploads"
  );

if (
  !fs.existsSync(
    uploadPath
  )
) {
  fs.mkdirSync(
    uploadPath,
    { recursive: true }
  );
}

cb(
  null,
  uploadPath
);
  },

  filename: (
    req,
    file,
    cb
  ) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(
        Math.random() * 1e9
      );

    cb(
      null,
      uniqueName +
        path.extname(
          file.originalname
        )
    );
  },
});

 const allowedExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
];

const fileFilter = (
  req,
  file,
  cb
) => {
  const extension =
    path.extname(
      file.originalname
    ).toLowerCase();

  const isImage =
    file.mimetype.startsWith(
      "image/"
    );

  if (
    isImage &&
    allowedExtensions.includes(
      extension
    )
  ) {
    return cb(
      null,
      true
    );
  }

  cb(
    new Error(
      "Only JPG, JPEG, PNG and WEBP images are allowed"
    )
  );
};

const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize:
      5 * 1024 * 1024,
  },
});

export default upload;