const builder = require('botbuilder');

const connector = new builder.ChatConnector({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword,
  openIdMetadata: process.env.BotOpenIdMetadata
});


const bot = new builder.UniversalBot(connector, ((session) => {
  session.send('You said: %s', session.message.text);
}));

// Connector listener wrapper to capture site url
const connectorListener = connector.listen();
function listen() {
  return function (req, res) {
    connectorListener(req, res);
  };
}

// Other wrapper functions
function beginDialog(address, dialogId, dialogArgs) {
  bot.beginDialog(address, dialogId, dialogArgs);
}

function sendMessage(message) {
  bot.send(message);
}

module.exports = {
  listen,
  beginDialog,
  sendMessage
};
