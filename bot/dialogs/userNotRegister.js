const util = require('util');
const builder = require('botbuilder');

const lib = new builder.Library('userNotRegister');
lib.dialog('/', [
  function (session) {
    session.send('Tu correo no esta registrado en Nippur, verifica que sea el mismo usado en Slack');
    session.endDialog();
  }
]);

// Export createLibrary() function
module.exports.createLibrary = function () {
  return lib.clone();
};
