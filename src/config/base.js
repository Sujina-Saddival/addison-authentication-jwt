const fs = require('fs');
const encoding = 'utf8';

module.exports = {
  connections: [{
    host: process.env.ADDISON_HOST,
    port: process.env.ADDISON_PORT,
    routes: {
      log: true,
    },
    tls: {
      key: fs.readFileSync(`${process.env.NODE_PATH}/ssl/server.key`, encoding),
      cert: fs.readFileSync(`${process.env.NODE_PATH}/ssl/server.crt`, encoding),
    },
  }],
};

// exports.registrations = [{
//   plugin: {
//     register: "jwt",
//     options: {
//       oauth: {
//         env: 'dev',
//         clientId: 'Apate-206139-client-creds', // 'Apate-206139',
//         clientSecret: '***TO_BE_DEFINED_IN_SECRET_CONFIG_FILE***'
//       }
//     }
//   }
// }]