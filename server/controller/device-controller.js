
const express = require('express');
const router = express.Router();
const {authorization, createAuthToken} = require("../authorization/auth");
const omit = require("lodash/omit");
const {getPublicKey, getPrivateKey} = require("../authorization/keys/keys");
const authMiddleware = authorization(getPublicKey(), {expiresIn: "1 day", algorithm: ["RS256"]});
const deviceManager = require("../db/db-controller/device");

module.exports = () => {

  router.get("/devices/:userID", authMiddleware, (req, res, next) => {
    deviceManager.getUserDevices(req.params.userID).then(info => {
      res.status(200).json(info);
    }).catch(err => next(err));

  });
  router.get("/device/:userID/:deviceID", authMiddleware, (req, res, next) => {
    deviceManager.getUserDevice(req.params.userID, req.params.deviceID).then(info => {
      res.status(200).json(info);
    }).catch(err => next(err));

  });
  router.delete("/device/:userID/:deviceID", authMiddleware, (req, res, next) => {
    deviceManager.deleteUserDevice(req.params.userID, req.params.deviceID).then(() => {

      res.status(200);
    }).catch(err => next(err));

  });

  router.post("/device/new/:userID", authMiddleware, (req, res, next) => {
    deviceManager.addNewUserDevice(req.params.userID, req.body).then((device) => {
      console.log("add")
      res.status(200).json(device);
    }).catch(err => next(err));

  });

  router.put("/device/edit/:userID/:deviceID", authMiddleware, (req, res, next) => {
    deviceManager.editUserDevice(req.params.userID, req.params.deviceID , req.body).then((device) => {
      console.log("edit")
      res.status(200).json(device);
    }).catch(err => next(err));

  });

  return router;
};
