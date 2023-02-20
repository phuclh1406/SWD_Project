const multer = require("multer");
const firebase = require("../config/FirebaseConfig");
const {NotFoundError} = require("../errors/Index");
const request = require('request');

const uploadFile = async (req, res) => {
  const upload = multer({
    storage: multer.memoryStorage(),
  });

  upload.single("file")(req, res, async () => {
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
      console.log(`File upload ${req.file.originalname}`);
    });

    

    // Get a signed URL for the file
    const file = firebase.bucket.file(req.file.originalname);
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '03-17-2023', // expiration date in mm-dd-yyyy format
    });

    // Use the URL to download the image
    request.get(url, (err, response, body) => {
      if (err) {
        console.log(err);
      } else {
        // Write the file to disk
        const fs = require('fs');
        fs.writeFile(req.file.originalname, body, (err) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json({ url });
          }
        });
      }
    });
    blobWriter.end(req.file.buffer);
  });
}

module.exports = uploadFile;