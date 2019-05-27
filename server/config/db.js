const mongoose = require("mongoose");
// const {DBError} = require("../utils/error/error-types");

const loadDbInstances = () => {


  require("../db/device");

 require("../db/iot-user");
  require("../db/pi-data");

  console.log('\x1b[36m%s\x1b[32m', "Load all db instances successfully!");
};

module.exports = () => new Promise((resolve, reject) => {

  mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true, useCreateIndex: true})
    .then(() => {
      console.log('\x1b[36m%s\x1b[32m', "Connect to mongoDB successfully!");
      loadDbInstances();

      resolve()
    }).catch(err => {
      console.log("Cannot connect to mongoDB: \n", err);
      reject();
    }
  );

});






