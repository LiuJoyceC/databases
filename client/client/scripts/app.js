$(document).ready(function(){
  var user = window.location.search.split('username=')[1];
  var rooms = {lobby: 1};
  var friends = {};
  friends[user] = 1;
  var app = {
    server: 'https://api.parse.com/1/classes/chatterbox/',
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
        message.username = user;
        message.text = $('#message').val();
        $('#message').val('Post a message!');
        app.handleSubmit(message);
      });
      $('#roomSelect').change(function() {
        app.fetch();
      })
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
      $.ajax( {
        url: app.server,
        data: JSON.stringify(message),
        type: 'POST',
        success: function(message) {app.fetch();},
        error: function(message) {console.log(message); console.log('there was an error!');},
        contentType: 'application/json'
      });
    },
    fetch: function() {
      $.ajax( {
        url: app.server,
        type: 'GET',
        dataType: 'json',
        success: success
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
      var textNode = $('<div class="message-text">' + _.escape(message.text) + '</div>');
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

  var success = function(json){
    app.clearMessages();
    var chatList = json.results;
    var currentRoom = $('#roomSelect').val();
    for (var i = 0; i <chatList.length ; i++) {
      var roomname = _.escape((chatList[i].roomname || 'lobby').toString().trim());
      if (roomname === currentRoom) {
        app.addMessage(chatList[i]);
      } else if (!rooms.hasOwnProperty(roomname)) {
        app.addRoom(roomname);
      }
    }
  };

app.init();
app.fetch();
//<script>$('body').css('background-image','url("http://www.sopawsome.com/wp-content/uploads/2016/02/penguin-push-penguin.gif")');</script>
//app.send({username: "<script>$('body').css('background-image','url(\"http://www.sopawsome.com/wp-content/uploads/2016/02/penguin-push-penguin.gif\")');</script>", text:"<script>$('body').css('background-image','url(\"http://www.sopawsome.com/wp-content/uploads/2016/02/penguin-push-penguin.gif\")');</script>", roomname: 'lobby'});
//app.send({username: "penguinlover", text: 'penguins!', roomname: "<script>$('body').css('background-image','url(\"http://www.sopawsome.com/wp-content/uploads/2016/02/penguin-push-penguin.gif\")');</script>"});
});

