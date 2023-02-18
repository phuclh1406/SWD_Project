const multer = require("multer");
const firebase = require("../config/firebase_config");
const {NotFoundError} = require("../errors")

const uploadFile = (req, res) => {
  const upload = multer({
    storage: multer.memoryStorage(),
  });

  upload.single("file")(req, res, () => {
    if (!req.file) {
      throw new NotFoundError('No files found');
    }

    const blob = firebase.bucket.file(req.file.originalname);

    const blobWriter = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobWriter.on("error", (err) => {
      console.log(err);
    });

    blobWriter.on("finish", () => {
      res.status(200).json({msg: 'File upload'});
    });

    blobWriter.end(req.file.buffer);
  });
}

module.exports = uploadFile;