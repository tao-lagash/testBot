const util = require('util');
const builder = require('botbuilder');

const lib = new builder.Library('endConversation');
lib.dialog('/', [
  function (session) {
    session.send('Gracias por usar Delivery Bot');
    session.endDialog();
  }
]);

// Export createLibrary() function
module.exports.createLibrary = function () {
  return lib.clone();
};
