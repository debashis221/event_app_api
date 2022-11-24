const express = require("express");
const router = express.Router();
const model = require("../../model");
const errResBody = {
  status: 400,
  response: "error",
  msg: "Some thing went wrong.",
};
const token = require("../../token.js");
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

// Add a new user.
router.post("/", async (req, res) => {
  try {
    req.body.dateLastChanged = new Date();
    req.body.isActive = 1;
    if (req.body.confirmPassword === req.body.Password) {
      const UserResult = await model.TBL_Users.create(req.body);
      const userData = await model.TBL_Users.findOne({
        where: {
          Id: UserResult.Id,
        },
      });
      res.json({
        status: 200,
        response: "success",
        msg: "User has been added.",
        Id: UserResult.Id,
        userData: userData,
      });
    } else {
      res.json({
        status: 401,
        response: "validationerror",
        msg: "Please send confirm Password.",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ ...errResBody, error });
  }
});

//user login.
router.post("/login", async (req, res) => {
  try {
    if (
      typeof req.body.emailId === "undefined" ||
      req.body.emailId == "" ||
      req.body.emailId == null
    ) {
      res.json({
        status: 401,
        response: "validationerror",
        msg: "Please enter emailId.",
      });
      return false;
    }
    if (
      typeof req.body.password === "undefined" ||
      req.body.password == "" ||
      req.body.password == null
    ) {
      res.json({
        status: 401,
        response: "validationerror",
        msg: "Please enter Password.",
      });
      return false;
    }
    const userData = await model.TBL_Users.findOne({
      where: {
        emailId: req.body.emailId,
      },
    });
    if (userData) {
      if (userData.Password === req.body.password) {
        const authToken = token.assign({
          emailId: req.body.emailId,
          Id: userData.id,
        });
        // const data = await model.TBL_CartMaster.findAll({

        // });
        // if (data.isActive === 0) {

        // await model.TBL_CartMaster.create({ Id: userData.Id, isActive: 1 });
        res.json({
          status: 200,
          response: "success",
          user: userData,
          token: authToken,
        });
      } else {
        res.json({
          status: 400,
          response: "invalid",
          msg: "Invalid emailId or password.",
        });
      }
    } else {
      res.json({
        status: 400,
        response: "invalid",
        msg: "Invalid emailId or password.",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ ...errResBody, error });
  }
});

// Get all user list.
router.get("/", async (req, res) => {
  try {
    //const include = req.query.include === 'permissions' ? [{ all: true, nested: true }] : [];
    const userList = await model.TBL_Users.findAll({});
    res.json({ status: 200, response: "success", users: userList || [] });
  } catch (error) {
    res.json({ ...errResBody, error });
  }
});
// Get all user list.
router.get("/group/:groupId", async (req, res) => {
  try {
    const include =
      req.query.include === "permissions" ? [{ all: true, nested: true }] : [];
    const data = await model.TBL_Users.findAll({
      where: {
        groupId: req.params.groupId,
      },
    });
    res.json({ status: 200, response: "success", data: data || [] });
  } catch (error) {
    res.json({ ...errResBody, error });
  }
});

// Get specific user.
router.get("/:Id", async (req, res) => {
  try {
    //const include = req.query.include === 'permissions' ? [{ all: true, nested: true }] : [];

    const user = await model.TBL_Users.findAll({
      where: {
        Id: req.params.Id,
      },
    });
    res.json({ status: 200, response: "success", user: user || {} });
  } catch (error) {
    res.json({ ...errResBody, error });
  }
});

// update specific user data.
router.put("/:Id", upload.array("image"), async (req, res) => {
  try {
    if (req.files) {
      req.body.image = req.files[0].filename;
    }
    const user = await model.TBL_Users.update(req.body, {
      where: {
        Id: req.params.Id,
      },
    });
    console.log(user);
    res.json({
      status: 200,
      response: "success",
      msg: "Users data updated successfully.",
    });
  } catch (error) {
    res.json({ ...errResBody, error });
  }
});

// delete/inactive a user.
router.delete("/:Id", async (req, res) => {
  try {
    let x;
    const user = await model.TBL_Users.findOne({
      where: {
        Id: req.params.Id,
      },
    });

    if (user && user.isActive == true) {
      x = 0;
    } else {
      x = 1;
    }

    if (user) {
      await model.TBL_Users.update(
        { isActive: x },
        {
          where: {
            Id: req.params.Id,
          },
        }
      );
      res.json({
        status: 200,
        response: "success",
        msg: "User has been deactivated successfully.",
      });
    } else {
      res.json({ status: 300, response: "invalid", msg: "Invalid id." });
    }
  } catch (error) {
    res.json({ ...errResBody, error });
  }
});

// delete a user.
router.delete("/delete/:Id", async (req, res) => {
  try {
    const tabDlt = await model.TBL_Users.destroy({
      where: {
        Id: req.params.Id,
      },
    });
    res.json({
      status: 200,
      response: "success",
      msg: "Tab has been deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.json(errResBody);
  }
});
router.post("/resetPassword", async (req, res) => {
  try {
    console.log(req.body);
    if (req.body.confirmPassword === req.body.newPassword) {
      console.log(req.body.resetPasswordToken);
      await model.TBL_Users.update(
        {
          Password: req.body.newPassword,
        },
        {
          where: {
            resetPasswordToken: req.body.resetPasswordToken,
          },
        }
      );

      res.json({
        status: 200,
        response: "success",
        msg: "User has been updated.",
      });
    } else {
      res.json({
        status: 401,
        response: "validationerror",
        msg: "New password and confirm password should be same.",
      });
    }
  } catch (error) {
    console.log(error);
    res.json(errResBody);
  }
});

module.exports = router;
