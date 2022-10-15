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
    const eventList = await model.TBL_Events.findAll({});
    res.json({ status: 200, response: "success", events: eventList || [] });
  } catch (error) {
    res.json({ ...errResBody, error });
  }
});

//create event
router.post("/", upload.array("image"), async (req, res) => {
  try {
    if (req.files) {
      req.body.image = req.files[0].filename;
    }
    const EventResult = await model.TBL_Events.create(req.body);
    res.json({
      status: 200,
      response: "success",
      msg: "Event has been added.",
      eventData: EventResult,
    });
  } catch (error) {
    console.log(error);
    res.json({ ...errResBody, error });
  }
});

//Delete
router.delete("/:eventId", async (req, res) => {
  try {
    const eventDLT = await model.TBL_Events.destroy({
      where: {
        Id: req.params.eventId,
      },
    });
    res.json({
      status: 200,
      response: "success",
      msg: "event has been deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.json({ ...errResBody, error });
  }
});

module.exports = router;
