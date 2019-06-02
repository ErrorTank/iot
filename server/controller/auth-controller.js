const express = require('express');
const router = express.Router();
const {authorization, createAuthToken} = require("../authorization/auth");
const omit = require("lodash/omit");
const {getPublicKey, getPrivateKey} = require("../authorization/keys/keys");
const authMiddleware = authorization(getPublicKey(), {expiresIn: "1 day", algorithm: ["RS256"]});
const accManager = require("../db/db-controller/iot-user");

module.exports = (io) => {

  router.get("/auth", authMiddleware, (req, res, next) => {

    accManager.getClientUserCache(req.user).then(info => {
      res.status(200).json(omit(info, 'password'));
    }).catch(err => next(err));

  });
  router.post("/login", (req, res, next) => {

    accManager.checkLogin(req.body).then((data) => {
      let info = omit(data, ["password"]);
      createAuthToken(info, getPrivateKey(), {expiresIn: "1 day", algorithm: "RS256"}).then(token => {
        res.status(200).json({token, info});
      }).catch(err => next(err));

    }).catch(err =>{
      next(err);
    });

  });

  return router;
};
