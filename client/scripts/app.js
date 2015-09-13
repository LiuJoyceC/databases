$(document).ready(function(){
  var user = window.location.search.split('username=')[1];
  console.log('user is ' + user);
  var userID;

  var login = {
    server: 'http://localhost:3000/classes/users',
    getID: function(){
      console.log('username is ' + user + 'inside scope');
      // debugger;
      $.ajax( {
        data: {username: user},
        url: login.server,
        type: 'GET',
        // dataType: 'json',
        contentType: 'application/json',
        success: function(data){userID = data; console.log('userID is ' + userID);},
        error: function(err) {console.table(err);console.log('get request error');}
      });
    }
  };

  var rooms = {lobby: 1};
  var friends = {};
  friends[user] = 1;

  var app = {
    server: 'http://localhost:3000/classes',
    init: function() {
      // $('.username').click(function() {
      //   app.addFriend();
      // });
      $('#main').on('click', '.username', function() {
        var name = $(this).data('username');
        app.addFriend(name);
      });
      $('#send').submit(function(event) {
        event.preventDefault();
        var message = {};
        message.roomname = $('#roomSelect').val();
        message['user_id'] = userID;
        message['message_text'] = $('#message').val();
        $('#message').val('Post a message!');
        app.handleSubmit(message);
      });
      $('#roomSelect').change(function() {
        app.fetch();
      });
      $('#createroom').click(function() {
        var newRoom = prompt("Name of room").toString();
        newRoom = newRoom.trim();
        if (newRoom.length === 0) {
          alert("Invalid room name");
        } else if (rooms.hasOwnProperty(newRoom)) {
          alert("Room already exists");
        } else {
          app.addRoom(newRoom);
          $('#roomSelect').val(newRoom);
        }
      });
    },
    send: function(message) {
      console.log('send is running');
      $.ajax( {
        url: app.server + '/messages',
        data: JSON.stringify(message),
        type: 'POST',
        success: function(message) {app.fetch();},
        error: function(message) {console.log(message); console.log('post request error');},
        // dataType: 'json',
        contentType: 'application/json'
      });
    },
    fetch: function() {
      console.log('fetch is running');
      $.ajax( {
        data: {roomname: $('#roomSelect').val()},
        url: app.server + '/messages',
        type: 'GET',
        // dataType: 'json',
        contentType: 'application/json',
        success: loadMessages,
        error: function(err) {console.table(err);console.log('get request error');}
      });
    },
    getRooms: function() {
      $.ajax( {
        data: {roomname: $('#roomSelect').val()},
        url: app.server + '/rooms',
        type: 'GET',
        contentType: 'application/json',
        success: function(rows) {
          for (var i = 0; i < rows.length; i++) {
            var roomname = rows[i].roomname;
            var alreadyListed = rooms[roomname];
            if (!alreadyListed) {
              app.addRoom(roomname);
            }
          }
        },
        error: function(err) {console.table(err);console.log('get request error');}
      });
    },
    clearMessages: function() {
      $('#chats').remove();
      $('#main').append($('<div id="chats"></div>'));
    },
    addMessage: function(message) {
      var chat = $('<div class="chat"></div>');
      var escName = _.escape(message.username);
      var userNode = $('<div class="username">' + escName + '</div>');
      var textNode = $('<div class="message-text">' + _.escape(message["message_text"]) + '</div>');
      if (friends.hasOwnProperty(escName)) {
        textNode.addClass('friend');
      }
      userNode.attr('data-username', escName);
      chat.append(userNode);
      chat.append(textNode);

      $('#chats').append(chat);
    },
    addRoom: function(roomname) {
      $('#roomSelect').append($('<option value="' + roomname + '">' + roomname + '</option>'));
      rooms[roomname] = 1;
    },
    addFriend: function(name) {
      if (!friends.hasOwnProperty(name)) {
        friends[name] = 1;
        app.fetch();
      }
    },
    handleSubmit: function(message) {
      app.send(message);
    }
  };

  var loadMessages = function(json){
    app.clearMessages();
    var chatList = json;
    var currentRoom = $('#roomSelect').val();
    for (var i = 0; i <chatList.length ; i++) {
      // var roomname = _.escape((chatList[i].roomname || 'lobby').toString().trim());
      // if (roomname === currentRoom) {
      app.addMessage(chatList[i]);
      // } else if (!rooms.hasOwnProperty(roomname)) {
      //   app.addRoom(roomname);
      // }
      app.getRooms();
    }
  };


app.init();
app.fetch();
app.getRooms();
if (user) {
  login.getID();
}
// app.send({'user_id': 2, text: 'another test', roomname: 'lobby'});
//<script>$('body').css('background-image','url("http://www.sopawsome.com/wp-content/uploads/2016/02/penguin-push-penguin.gif")');</script>
//app.send({username: "<script>$('body').css('background-image','url(\"http://www.sopawsome.com/wp-content/uploads/2016/02/penguin-push-penguin.gif\")');</script>", text:"<script>$('body').css('background-image','url(\"http://www.sopawsome.com/wp-content/uploads/2016/02/penguin-push-penguin.gif\")');</script>", roomname: 'lobby'});
//app.send({username: "penguinlover", text: 'penguins!', roomname: "<script>$('body').css('background-image','url(\"http://www.sopawsome.com/wp-content/uploads/2016/02/penguin-push-penguin.gif\")');</script>"});
});

