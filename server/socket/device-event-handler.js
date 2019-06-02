const IotUser = require("../db/iot-user");
const deviceEvent = require("../socket/event-emitter");
const mongoose = require("mongoose");

module.exports = (socket) => {
  socket.on("dataChange", ({user, device, time, temperature, humidity}) => {
    IotUser.findOneAndUpdate({
      _id: mongoose.Types.ObjectId(user),
      "devices._id": mongoose.Types.ObjectId(device)
    }, {
      $push: {
        "devices.$.dataHistory": {time, temperature, humidity, _id: mongoose.Types.ObjectId()}
      }
    }, {new: true}).lean().then(data => {
      socket.emit("dataChange", data.devices.find(each => each._id.toString() === data.device))
    });
  });
  socket.on("toggleLight", (data, cb) => {
    socket.emit("toggle-light", data, cb);
  })
};