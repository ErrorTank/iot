require('dotenv').config({path: '.env'});
const app = require("./config/express");
const server = require('http').createServer(app);
const routerConfig = require('./config/routes');
const initializeDb = require("./config/db");
const initializeSocket = require("./socket/index");

initializeDb().then((db) => {

  app.use('/', routerConfig(db));
  app.use(require('./utils/error/error-handlers'));
  server.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}` );

  });
  initializeSocket(server);
}).catch(err => {
  console.error('Unable to connect to the database:', err);
  process.exit();
});




