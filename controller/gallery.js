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

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});
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
//create event
router.post("/", upload.array("image", 100), async (req, res) => {
  try {
    if (req.files) {
      for (let index = 0; index < req.files.length; index++) {
        await model.TBL_Gallery.create({
          name: req.body.name,
          image: req.files[index].filename,
        });
      }
    }
    res
      .json({
        status: 200,
        response: "success",
        msg: "Image has been added.",
      })
      .end();
  } catch (error) {
    console.log(error);
    res.json({ ...errResBody, error }).end();
  }
});
//Delete
router.post("/delete", async (req, res) => {
  try {
    const eventDLT = await model.TBL_Gallery.destroy({
      where: {
        Id: req.body.imageId,
      },
    });
    res.json({
      status: 200,
      response: "success",
      msg: "Image has been deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.json({ ...errResBody, error });
  }
});

module.exports = router;
