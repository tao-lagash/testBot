const builder = require('botbuilder');
const helperNippur = require('../../helpers/nippur');

const lib = new builder.Library('productSelection');
lib.dialog('/', [
  function (session, results, next) {
    const msg = 'Selecciona el producto';
    const userId = parseInt(session.userData.nippur[0].Id);
    const proyectos = [];
    helperNippur.getProductByUserId(userId).then((res) => {
      session.userData.proyectos = res;
      res.forEach((element) => {
        proyectos.push(element.NombreFacturacion);
      });
      builder.Prompts.choice(session, msg, proyectos, { listStyle: 3, maxRetries: 1, retryPrompt: 'No se pudo reconocer su respuesta. Por favor seleccione una opción de la lista.' });
    });
  },
  function (session, results, next) {
    session.userData.proyecto = results.response.entity;
    session.userData.proyectoId = session.userData.proyectos[results.response.index].IdProyecto;
    session.endDialogWithResult(results);
  }
]);

// Export createLibrary() function
module.exports.createLibrary = function () {
  return lib.clone();
};
