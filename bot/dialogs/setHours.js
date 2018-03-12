const builder = require('botbuilder');
const helperNippur = require('../../helpers/nippur');

const lib = new builder.Library('setHours');
lib.dialog('/', [
  function (session, args) {
    const horas = ['2', '4', '6', '8'];
    builder.Prompts.choice(session, '¿Cuantas horas desea cargar', horas, { listStyle: 3, maxRetries: 1, retryPrompt: 'No se pudo reconocer su respuesta. Por favor seleccione una opción de la lista.' });
  },
  function (session, results, next) {
    session.userData.horas = results.response.entity;
    const opciones = ['SI', 'NO'];
    builder.Prompts.choice(
      session,
      `Vamos a cargar ${session.userData.horas} horas al proyecto ${session.userData.proyecto}. ¿Desea cargar las horas?`,
      opciones,
      { listStyle: 3 }
    );
  },
  function (session, results, next) {
    if (results.response.entity === 'NO') {
      session.endDialog();
    }

    cargarHoras(session).then((res) => {
      session.send('Horas cargadas exitosamente');
      session.endDialog();
    }).catch((error) => {
      session.send('Oops. Ocurrió un error al cargar las horas');
      session.endDialog();
    });
  }
]);

function cargarHoras(session) {
  return helperNippur.setHoursProject({
    horas: session.userData.horas, fecha: new Date(), descripcion: 'descripcion', usuarioId: session.userData.userName, productoId: session.userData.proyectoId
  });
}

// Export createLibrary() function
module.exports.createLibrary = function () {
  return lib.clone();
};
