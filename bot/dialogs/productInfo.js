const builder = require('botbuilder');
const helperNippur = require('../../helpers/nippur');

const lib = new builder.Library('productInfo');
lib.dialog('/', [
  function (session, args) {
    // Si el correo esta registrado en nippur
    helperNippur.getProductById(parseInt(session.userData.proyectoId)).then((res) => {
      const repo = res[0].Repositorio ? res[0].Repositorio : '-';
      const clienteId = res[0].IdCliente ? res[0].IdCliente : '-';
      const nombre = res[0].Nombre ? res[0].Nombre : '-';
      session.send(`Nombre: ${nombre}`);
      session.send(`Cliente Id: ${clienteId}`);
      session.send(`Repositorio: ${repo}`);
      session.endConversation();
    });
  }
]);

// Export createLibrary() function
module.exports.createLibrary = function () {
  return lib.clone();
};
