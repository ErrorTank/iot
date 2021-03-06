const fs = require("fs-extra");
const path = require("path");

const listDirFiles = ["assets", "bundle"];
const source = "../public";
const dest = "../dist";


Promise.all(listDirFiles.map(item => fs.copy(path.resolve(__dirname, source + "/" + item), path.resolve(__dirname, dest + "/" + item), {overwrite: true})))
  .then(() => console.log("success"))
  .catch((err) => console.log(err))
;
// "heroku-postbuild": "webpack -p --config ./webpack.prod.config.js",