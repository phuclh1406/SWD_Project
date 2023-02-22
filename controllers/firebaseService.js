const multer = require("multer");
const firebase = require("../config/firebase_config");
const { NotFoundError } = require("../errors");
const request = require("request");
const path = require("path");
const joi = require("joi");
const { title, body, device_token } = require("../helpers/joi_schema");

const parentDirectory = path.dirname(__dirname);

const uploadFile = async (req, res) => {
  const upload = multer({
    storage: multer.memoryStorage(),
  });

  upload.single("file")(req, res, async () => {
    if (!req.file) {
      throw new NotFoundError("No files found");
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
      action: "read",
      expires: "03-17-2023", // expiration date in mm-dd-yyyy format
    });

    // Use the URL to download the image
    request.get(url, (err, response, body) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error!" });
      } else {
        // Write the file to disk
        const fs = require("fs");
        var pathImg = parentDirectory + "/public/" + req.file.originalname;
        fs.writeFile(pathImg, body, (err) => {
          if (err) {
            console.log(err);
            return res
              .status(500)
              .json({ message: "Upload file to firebase error!" });
          } else {
            res.status(200).json({ url });
          }
        });
      }
    });
    blobWriter.end(req.file.buffer);
  });
};

const pushNotification = (req, res) => {
  const { error } = joi
    .object({ title, body, device_token })
    .validate( req.body );
  if (error) throw new BadRequestError(error.details[0].message);
  const message = {
    notification: {
      title: req.body.title,
      body: req.body.content,
    },
    token: req.body.device_token,
  };

  firebase
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
};

module.exports = { uploadFile, pushNotification };
