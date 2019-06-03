const IotUser = require("../db/iot-user");
const deviceEvent = require("../socket/event-emitter");
const mongoose = require("mongoose");



module.exports = (socket, io) => {
  //Xử lý dữ liệu thay đổi từ cảm biến
  socket.on("dataChange", ({user, device, time, temperature, humidity}) => {
    console.log("cac")
    IotUser.findOneAndUpdate({
      _id: mongoose.Types.ObjectId(user),
      "devices._id": mongoose.Types.ObjectId(device)
    }, {
      $push: {
        "devices.$.dataHistory": {time, temperature, humidity, _id: mongoose.Types.ObjectId()}
      }
    }, {new: true}).lean().then(data => {
      let result = data.devices.find(each => {
        return each._id.toString() === device;
      });
      io.sockets.emit("dataChange", result)
    });
  });


  //Bật tắt đèn
  socket.on("toggleLight", (data, cb) => {
    console.log(data);
    io.sockets.emit("toggle-light", data);
    cb()
  })
};