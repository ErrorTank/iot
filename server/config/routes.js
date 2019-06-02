const express = require('express');
const router = express.Router();

module.exports = (db, io) => {

  router.use('/api', require("../controller/auth-controller")(io));
  router.use('/api', require("../controller/device-controller")(io));
  return router;
};
