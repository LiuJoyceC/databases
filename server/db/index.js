var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
exports.connection = mysql.createConnection({
      user: "root",
      password: "",
      database: "chat"
    });

exports.connection.connect();

// var getMsgQueryStr = 'select \
//    a.message_text, \
//    a.roomname, \
//    b.username \
//  from messages as a \
//  left join users as b \
//  on a.user_id = b.user_id \
//  where a.roomname = '; // will need to concat to the room name

// exports.connection.query(getMsgQueryStr + "'wrongroom'", function(err, rows, fields) {
//   if (err) {
//     throw err;
//   } else {
//     console.log('message ' + rows[0].message_text + ' name ' + rows[0].username);
//   }
// });
