require('dotenv').config({path: '.env'});
const app = require("./config/express");
const server = require('http').createServer(app);
const routerConfig = require('./config/routes');
const initializeDb = require("./config/db");
const initializeSocket = require("./socket/index");

initializeDb().then((db) => {
  console.log(process.env)

  server.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT || 6969}` );
    const io = initializeSocket(server);
    app.use('/', routerConfig(db, io));
    app.use(require('./utils/error/error-handlers'));
  });

}).catch(err => {
  console.error('Unable to connect to the database:', err);
  process.exit();
});




