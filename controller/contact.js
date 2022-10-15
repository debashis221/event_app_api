const express = require("express");
const router = express.Router();
const model = require("../model");
const errResBody = {
  status: 400,
  response: "error",
  msg: "Some thing went wrong.",
};

// Get all contact list.
router.get("/", async (req, res) => {
  try {
    //const include = req.query.include === 'permissions' ? [{ all: true, nested: true }] : [];
    const contactList = await model.TBL_Contact.findAll({});
    res.json({ status: 200, response: "success", contact: contactList || [] });
  } catch (error) {
    res.json({ ...errResBody, error });
  }
});

//create contact
router.post("/", async (req, res) => {
  try {
    const contactResult = await model.TBL_Contact.create(req.body);
    res.json({
      status: 200,
      response: "success",
      msg: "Thank You! We'll Contact You Shortly!",
      contactData: contactResult,
    });
  } catch (error) {
    console.log(error);
    res.json({ ...errResBody, error });
  }
});

//Delete
router.delete("/:contactId", async (req, res) => {
  try {
    const contactDLT = await model.TBL_Contact.destroy({
      where: {
        Id: req.params.contactId,
      },
    });
    res.json({
      status: 200,
      response: "success",
      msg: "contact has been deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.json({ ...errResBody, error });
  }
});

module.exports = router;
