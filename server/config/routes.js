const express = require('express');
const router = express.Router();

module.exports = () => {

  router.use('/api', require("../controller/auth-controller")());
  router.use('/api', require("../controller/device-controller")());
  return router;
};
