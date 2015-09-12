var models = require('../models');
var bluebird = require('bluebird');



module.exports = {
  messages: {
    get: function (req, res) {
      var roomname = req.body.roomname;
      models.messages.get(roomname, function(err, rows) {
        if (err) {
          throw err;
        } else {
          console.log(JSON.stringify(rows));
          res.end(JSON.stringify(rows));
        }
      });
      // models.messages.get(roomname);
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body, function(err){
        if (err){
          throw err;
        }
        res.end();
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      var username = req.body.username;
      models.users.post(username, function(err, insertInfo){
        if (err){
          throw err;
        }
        console.log(insertInfo.insertId);
        res.end(insertInfo.insertId.toString());
      });
    }
  }
};

