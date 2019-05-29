const deviceEvent = require("../socket/event-emitter");
const deviceHandlers = require("./device-event-handler");

module.exports = (server) => {
  const io = require('socket.io')(server);
  io.sockets.on('connection', function (socket) {

    socket.on('join room', function (data, cb) {
      console.log(data.deviceID);
      socket.join(data.deviceID);
      deviceEvent.init(socket).then(() => cb());
    });
    socket.on('leave room', function (data) {
      console.log(data.deviceID);
      socket.leave(data.deviceID);
    });
    deviceHandlers(socket);
  });





};