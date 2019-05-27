const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const PiData = require("./db/pi-data");
const Device = require("./db/device");

const app = express();

app.use(bodyParser.json());




mongoose.connect("mongodb://tank:123123qwe@ds135726.mlab.com:35726/ecommerce", {
  useNewUrlParser: true,
  useCreateIndex: true
})
  .then(() => {
    console.log('\x1b[36m%s\x1b[32m', "Connect to mongoDB successfully!");


  }).catch(err => {
    console.log("Cannot connect to mongoDB: \n", err);

  }
);

const server = require("http").Server(app);
const io = require("socket.io")(server);
server.listen(6969);


io.sockets.on('connection', function (socket) {
  // once a client has connected, we expect to get a ping from them saying what room they want to join
  socket.on('join-channel', function (data) {
    console.log(data.room);
    socket.join(data.room);
  });
  socket.on("send-data", (data) => {
    let item = new PiData(data);
    item.save();
  });

  socket.on("create-device", (data) => {
    let item = new Device(data);
    item.save((err, doc) => {

      socket.emit("rr",doc);
    });
  });
});

