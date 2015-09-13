var models = require('../models');
var _ = require('underscore');

var headers = {
  "Content-type": "application/json"
};

module.exports = {
  messages: {
    get: function (req, res) {
      var roomname = req.query.roomname;
      models.messages.get(roomname, function(rows) {
        var data = _.map(rows, function(row) {
          var rowObj = {};
          rowObj['message_text'] = row['message_text'];
          rowObj.roomname = row.roomname;
          rowObj.username = row.user.username;
          return rowObj;
        });
        res.status(200).send(data);
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body, function(rows){
        res.status(201).end();
      });
    }, // a function which handles posting a message to the database
    options: function (req, res){
      res.end();
    }
  },

  users: { // Ditto as above
    get: function (req, res) {
      var username = req.query.username;
      models.users.get(username, function(rows){
        if (rows.length){
          res.status(200).end(rows[0]['id'].toString());
        }
        else {
          models.users.post(username, function(data){
            res.end(data['id'].toString());
          });
        }
      });
    },
    post: function (req, res) {
    }
  },

  rooms: {
    get: function (req, res) {
      models.rooms.get(function(rows){

        res.status(200).send(rows);
      });
    },
    post: function (req, res) {
    }
  }
};

