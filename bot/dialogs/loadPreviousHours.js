const builder = require('botbuilder');
const helperNippur = require('../../helpers/nippur');

const lib = new builder.Library('loadPreviousHours');

lib.dialog('/', [
  function (session, results, next) {
    helperNippur.getLastHourByUser(session.userData.userName).then((res) => {
      if (res.length === 0) { return session.endDialog(); }

      const {
        Nombre, Fecha, Horas, IdProyecto, Descripcion
      } = res[0];
      const hoy = new Date(new Date().setHours(0, 0, 0, 0));
      const fechaProyecto = new Date(new Date(Fecha).setHours(0, 0, 0, 0));

      if (fechaProyecto.getTime() < hoy.getTime()) {
        builder.Prompts.choice(session, `Tiene ${Horas} horas cargadas anteriormente al proyecto ${Nombre}. ¿Desea volver a cargarlas?`, ['Si', 'No'], { listStyle: 3 });
        session.userData.proyectoAnterior = {
          Nombre,
          Fecha,
          Horas,
          IdProyecto,
          Descripcion
        };
      } else {
        session.endDialog();
      }
    });
  },
  function (session, results, next) {
    session.endDialogWithResult(results);
  }
]);

// Export createLibrary() function
module.exports.createLibrary = function () {
  return lib.clone();
};
