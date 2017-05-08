// var express = require('express');
// var app = express();

var app = require('express')();
var http = require('http').Server(app);
let io = require('socket.io')(http);

var port = process.env.PORT || 5000;

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/pages/index.html');
});

app.get('/chatroom', function(req, res) {
  res.render(__dirname + '/views/pages/chatroom.ejs');
});

app.get('/motion', function(req, res) {
  res.render(__dirname + '/views/pages/interface+motion/motion.ejs');
});

app.get('/interface', function(req, res) {
  res.render(__dirname + '/views/pages/interface+motion/interface.ejs');
});

var sprites = {};

io.on('connection', function(socket) {
  console.log('New connect');
  socket.on('disconnect', function() {
    console.log('Connection is turned off');
  });
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });

  socket.emit('interface+motion_listen', sprites);
  socket.on('interface+motion_send', function(data) {
    var axesX = [150, 200, 250, 300, 350, 400, 450];
    if (socket.id in sprites) {
      switch (data.command) {
        case 'right':
          sprites[socket.id].x += 60;
          break;
        case 'left':
          sprites[socket.id].x -= 60;
          break;
      }
    } else {
      sprites[socket.id] = {
        x: 350,
        y: 280
      };
    };

    socket.broadcast.emit('interface+motion_listen', sprites);
  });
});

http.listen(port, function() {
  console.log('Server started on port: ' + port);
});
