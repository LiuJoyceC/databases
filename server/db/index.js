var Sequelize = require("sequelize");
exports.sequelize = new Sequelize("chat", "root", "");

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
var Users = exports.sequelize.define('users', {
  username: Sequelize.STRING
});

var Messages = exports.sequelize.define('messages', {
  message_text: Sequelize.STRING,
  user_id: Sequelize.INTEGER,
  roomname: Sequelize.STRING
});

Users.hasMany(Messages);
Messages.belongsTo(Users, {foreignKey: 'user_id'});

Users.sync();
Messages.sync();
exports.Users = Users;
exports.Messages = Messages;
