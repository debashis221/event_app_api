const express = require("express");
const router = express.Router();
const model = require("../model");
const errResBody = {
  status: 400,
  response: "error",
  msg: "Some thing went wrong.",
};
const token = require("../token.js");
const uuid = require("uuid");

const multer = require("multer");
const crypto = require("crypto");
const mime = require("mime");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString("hex") + "." + mime.getExtension(file.mimetype));
    });
  },
});

const upload = multer({ storage: storage });

// Get all event list.
router.get("/", async (req, res) => {
  try {
    //const include = req.query.include === 'permissions' ? [{ all: true, nested: true }] : [];
    const galleryList = await model.TBL_Gallery.findAll({});
    res.json({ status: 200, response: "success", gallery: galleryList || [] });
  } catch (error) {
    res.json({ ...errResBody, error });
  }
});
var uploadMultiple = upload.fields([{ name: "image", maxCount: 10 }]);
//create event
router.post("/", uploadMultiple, async (req, res) => {
  try {
    if (req.files) {
      req.body.image = req.files.image[0].filename;
    }
    const GalleryResult = await model.TBL_Gallery.create(req.body);
    res.json({
      status: 200,
      response: "success",
      msg: "Image has been added.",
      galleryData: GalleryResult,
    });
  } catch (error) {
    console.log(error);
    res.json({ ...errResBody, error });
  }
});

module.exports = router;
