const express = require("express");
const multer = require("multer");
const firebase = require("../config/firebase_config");

function uploadFile(req, res) {
  const app = express();
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json({ extended: false }));

  const upload = multer({
    storage: multer.memoryStorage(),
  });

  upload.single("file")(req, res, () => {

    console.log(req.file)
    if (!req.file) {
      return res.status(400).send("Error: No files found");
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
      res.status(200).send("File uploaded.");
    });

    blobWriter.end(req.file.buffer);
  });
}

module.exports = uploadFile;