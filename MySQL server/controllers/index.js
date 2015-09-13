var models = require('../models');
var bluebird = require('bluebird');


var headers = {
    // "access-control-allow-origin": "*",
    // "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    // "access-control-allow-headers": "content-type, accept",
    // "access-control-max-age": 10, // Seconds.
    "Content-type": "application/json"
};

module.exports = {
  messages: {
    get: function (req, res) {
      var roomname = req.query.roomname;
      // res.writeHead(200, headers);
      models.messages.get(roomname, function(err, rows) {
        if (err) {
          throw err;
        } else {
          res.status(200).send(rows);
        }
      });
      // models.messages.get(roomname);
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      // res.writeHead(201, headers);
      models.messages.post(req.body, function(err){
        if (err){
          throw err;
        }
        res.status(201).end();
      });
    }, // a function which handles posting a message to the database
    options: function (req, res){
      res.end();
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      var username = req.query.username;
      models.users.get(username, function(err, rows){
        if (err){
          throw err;
        }
        if (rows.length){
          res.status(200).end(rows[0]['user_id'].toString());
        }
        else {
          models.users.post(username, function(err, insertInfo){
            if (err){
              throw err;
            }
            res.end(insertInfo.insertId.toString());
          });
        }
      });
    },
    post: function (req, res) {
    }
  },

  rooms: {
    get: function (req, res) {
      models.rooms.get(function(err, rows){
        if (err){
          throw err;
        }
        res.status(200).send(rows);
      });
    },
    post: function (req, res) {
    }
  }
};

