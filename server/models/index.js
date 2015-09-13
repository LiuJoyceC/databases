var db = require('../db');

module.exports = {
  messages: {
    get: function (roomname, cb) {
      db.Messages.findAll({
        where: {roomname: roomname},
        order: [['id', 'DESC']],
        include: [db.Users]
      })
                 .then(cb);
    }, // a function which produces all the messages
    post: function (obj, cb) {
      db.Messages.create({
        "message_text": obj["message_text"],
        "user_id": obj["user_id"],
        "roomname": obj["roomname"]
      }).then(cb);
    } // a function which can be used to insert a message into the database
  },

  users: {
    get: function (username, cb) {
      //username = username || 'username';
      db.Users.findAll({where: {username: username}}).then(cb);
    },
    post: function (username, cb) {
      db.Users.create({
        username: username
      }).then(cb);
    }
  },

  rooms: {
    get: function (cb) {
      db.sequelize.query("SELECT DISTINCT roomname FROM messages", { type: db.sequelize.QueryTypes.SELECT})
      .then(cb);
    }
  }
};
