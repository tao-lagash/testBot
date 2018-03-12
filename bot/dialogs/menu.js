const builder = require('botbuilder');

const lib = new builder.Library('menu');
lib.dialog('/', [
  function (session, args) {
    // Si el correo esta registrado en nippur
    session.send('Tu correo esta registrado en Nippur, puedes acceder a las siguientes opciones');
    const opciones = {
      'Cargar Horas': {
        id: 1
      },
      'Información Proyectos': {
        id: 2
      },
    };
    session.userData.opciones = opciones;
    builder.Prompts.choice(session, '¿Que deseas hacer?', opciones, { listStyle: 3, maxRetries: 1, retryPrompt: 'No se pudo reconocer su respuesta. Por favor seleccione una opción de la lista.' });
  },
  function (session, results, next) {
    session.userData.tipo = results.response.entity;
    session.endDialogWithResult(results);
  }
]);

// Export createLibrary() function
module.exports.createLibrary = function () {
  return lib.clone();
};
