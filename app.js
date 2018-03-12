const restify = require('restify');
const builder = require('botbuilder');

// Setup Restify Server
const server = restify.createServer();

server.get('/', (req, res, next) => {
  res.render('index', { title: 'Carga Horas' });
});

server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log('%s listening to %s', server.name, server.url);
});

// Listen for messages from users
const bot = require('./bot');

server.post('/api/messages', bot.listen());
