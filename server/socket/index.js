const deviceEvent = require("../socket/event-emitter");
const deviceHandlers = require("./device-event-handler");

module.exports = (server) => {
  const io = require('socket.io')(server);
  io.sockets.on('connection', function (socket) {
    console.log("cac");
    deviceEvent.init(socket);
    socket.on("disconnect", function () {
      deviceEvent.rm(socket.id)
    });
    deviceHandlers(socket);
  });

  return io;





};