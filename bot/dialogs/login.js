const builder = require('botbuilder');
const helperSlack = require('../../helpers/slack');
const helperNippur = require('../../helpers/nippur');

const lib = new builder.Library('login');
lib.dialog('/', [
  function (session, args, next) {
    // Obtiene el user id desde slack
    const slacksession = 'U2XGHV1K8:T2V6UN5N3';
    // const userId = session.message.address.user.id.toString().replace('"').split(':');

    const userId = slacksession.toString().replace('"').split(':');

    session.send('Obteniendo usuario desde slack...');
    helperSlack.getUserInfo(userId.splice(',')[0]).then((res) => {
      if (!res.ok) {
        session.send('Hola, delivery bot no pudo obtener tu usuario desde slack');
        session.endConversation();
      }


      helperSlack.getListUsers().then((usuariosSlack) => {
        helperNippur.getUsersNoLoadHoursToday().then((usuariosNippur) => {
          const userFilter = usuariosSlack.members.filter(value => usuariosNippur.some(usuarioNippur => (usuarioNippur.Username === value.name)));
        });
      });

      // helperNippur.getUsersNoLoadHoursToday().then((ress) => {
      //   console.log('RES===========>', ress);
      // });
      // helperNippur.getUsersNoLoadHoursToday()
      // helperSlack.getChannel('U78CLP3EJ').then((resu) => {
      //   console.log('RESSSSSSSSSSSSSSSSSSs======>', resu);
      //   helperSlack.sendMessage(resu.channel.id, 'Carga las horas po wn').then((resSend) => {
      //     console.log('SEND===========>', resSend);
      //   })
      //     .catch((exe) => {
      //       console.log('ERRORRRRRRRRRRRRSENDDDDDDDDDDDDDD======>', exe);
      //     });
      // })
      //   .catch((ex) => {
      //     console.log('ERRORRRRRRRRRRRR======>', ex);
      //   });
      session.userData.data = res;
      session.userData.userName = res.user.name;
      // Envia el correo del usuario, esto es para que el usuario vea con que correo tiene slack
      session.send(`Hola, Bienvenido tu correo registrado en slack es ${JSON.stringify(session.userData.data.user.profile.email)}`);

      session.send('Obteniendo usuario desde nippur...');
      helperNippur.getUserInfo(session.userData.data.user.profile.email).then((nippurRes) => {
        if (nippurRes.length > 0) {
          session.userData.nippur = nippurRes;
          session.endDialog();
        } else {
          session.beginDialog('userNotRegister:/');
        }
      });
    });
  }
]);

// Export createLibrary() function
module.exports.createLibrary = function () {
  return lib.clone();
};
