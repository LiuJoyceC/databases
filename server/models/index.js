var db = require('../db');

var getMsgQueryStr = ['select \
   a.message_text, \
   a.roomname, \
   b.username \
 from messages as a \
 left join users as b \
 on a.user_id = b.user_id \
where a.roomname in (', ')']; // will need to concat to the room name

var postMsgQueryStr = [
  'insert into messages (\
    message_text, \
    user_id, \
    roomname \
  ) \
values (', ')'];

var postUserQueryStr = [
  'insert into users (\
    username \
  ) \
values (', ')'];

var getUsrQueryStr = 'select \
   user_id \
 from messages \
 where username = ';

 // var getRoomsQueryStr =


module.exports = {
  messages: {
    get: function (roomname, cb) {
      roomname = roomname || 'select distinct roomname from messages';
      db.connection.query(getMsgQueryStr[0] + roomname + getMsgQueryStr[1], cb);
    }, // a function which produces all the messages
    post: function (obj, cb) {
      var array = [];
      // assume obj gives message, user id, and room
      var keys = ['message', 'user_id', 'roomname'];
      for (var i = 0; i < keys.length; i++) {
        array[i] = JSON.stringify(obj[keys[i]]);
      }
      console.log(postMsgQueryStr[0] + array.join(',') + postMsgQueryStr[1]);
      db.connection.query(postMsgQueryStr[0] + array.join(',') + postMsgQueryStr[1], cb);
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (username, cb) {
      db.connection.query(getUsrQueryStr + JSON.stringify(username), cb);
    },
    post: function (username, cb) {
      db.connection.query(postUserQueryStr[0] + JSON.stringify(username) + postUserQueryStr[1], cb);
    }
  }
};
