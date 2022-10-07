"use strict";

const user_controller = require("./user/users.js");
const groups_controller = require("./user/groups.js");
const tabs_controller = require("./user/tabs.js");
const events_controller = require("./events.js");
const posts_controller = require("./posts.js");
const permissiontypes_controller = require("./user/permissionTypes.js");
const grouppermission_controller = require("./user/groupPermission.js");
const userTypeCodes_controller = require("./user/userTypeCodes.js");

const token = require("../token.js");

const errResBody = {
  status: 400,
  response: "error",
  msg: "Some thing went wrong.",
};

const env = process.env.NODE_ENV || "local"; //process env or DEVELOPMENT in default.
const config = require("../config/config.json")[env];

module.exports = function (app) {
  //middleware for checking the auth.
  function verifyToken(req, res, next) {
    // next();
    try {
      if (
        req.originalUrl === "/api/v1/api-docs" ||
        req.originalUrl === "/api/v1/users/login" ||
        req.originalUrl === "/api/v1/users"
      ) {
        next();
      } else {
        const bearerHeader = req.headers["authorization"];
        if (bearerHeader) {
          const bearer = bearerHeader.split(" ");
          const bearerToken = bearer[1];
          const tokenIn = bearerToken;

          const token_data = token.verify(tokenIn);

          if (token_data) {
            req.body.UserId = token_data.UserId;
            next();
          } else {
            res.status(404).json({
              status: 403,
              response: "notauthorized",
              msg: "Invalid Token.",
            });
          }
        } else {
          //Forbidden
          res.status(403).json({
            status: 403,
            response: "notauthorized",
            msg: "Not authorized.",
          });
        }
      }
    } catch (err) {
      res.json({ ...errResBody, err });
    }
  }

  //passing all the routes throught the auth checking middleware.
  //app.all('/*', verifyToken, function(req, res, next) {
  app.all("/*", function (req, res, next) {
    next();
  });

  //rouing here.
  app.use("/api/v1/users", user_controller);
  app.use("/api/v1/groups", groups_controller);
  app.use("/api/v1/permissionTypes", permissiontypes_controller);
  app.use("/api/v1/groupPermission", grouppermission_controller);
  app.use("/api/v1/tabs", tabs_controller);
  app.use("/api/v1/events", events_controller);
  app.use("/api/v1/posts", posts_controller);
  app.use("/api/v1/userType", userTypeCodes_controller);
};
