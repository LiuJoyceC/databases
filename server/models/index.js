var db = require('../db');

var getMsgQueryStr = ['select \
   a.message_text, \
   a.roomname, \
   b.username \
 from messages as a \
 left join users as b \
 on a.user_id = b.user_id \
where a.roomname = ',' order by a.message_id desc']; // will need to concat to the room name

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
 from users \
 where username = ';

var getRoomsQueryStr = 'select distinct\
   roomname \
 from messages';


module.exports = {
  messages: {
    get: function (roomname, cb) {
      roomname = roomname ? JSON.stringify(roomname) : 'a.roomname';
      console.log('about to do get messages sql query');
      console.log(getMsgQueryStr + roomname);
      db.connection.query(getMsgQueryStr[0] + roomname + getMsgQueryStr[1], cb);
    }, // a function which produces all the messages
    post: function (obj, cb) {
      console.log('in model post');
      console.log(obj);
      var array = [];
      console.log('we are running message post');
      // assume obj gives message, user id, and room
      var keys = ['message_text', 'user_id', 'roomname'];
      for (var i = 0; i < keys.length; i++) {
        array[i] = JSON.stringify(obj[keys[i]]);
      }
      console.log('we are about to run the database query');
      console.log(postMsgQueryStr[0] + array.join(',') + postMsgQueryStr[1]);
      db.connection.query(postMsgQueryStr[0] + array.join(',') + postMsgQueryStr[1], cb);
    } // a function which can be used to insert a message into the database
  },

  users: {
    get: function (username, cb) {
      username = username || 'username';
      console.log(JSON.stringify(username));
      db.connection.query(getUsrQueryStr + JSON.stringify(username), cb);
    },
    post: function (username, cb) {
      db.connection.query(postUserQueryStr[0] + JSON.stringify(username) + postUserQueryStr[1], cb);
    }
  },

  rooms: {
    get: function (cb) {
      db.connection.query(getRoomsQueryStr, cb);
    }
  }
};
