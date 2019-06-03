const deviceEvent = require("../socket/event-emitter");
const deviceHandlers = require("./device-event-handler");

module.exports = (server) => {
  const io = require('socket.io')(server);
  io.sockets.on('connection', function (socket) {

    socket.on("disconnect", function () {

    });
    deviceHandlers(socket, io);
  });

  return io;





};