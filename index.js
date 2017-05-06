// var express = require('express');
// var app = express();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 5000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/pages/index.html');
});

app.get('/chatroom', function(req, res){
  res.sendFile(__dirname + '/views/pages/chatroom.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('Server started on port: ' + port);
});

// app.set('port', (process.env.PORT || 5000));
//
// app.use(express.static(__dirname + '/public'));
//
// // views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
//
// app.get('/', function(request, response) {
//   response.render('pages/index');
// });
//
// app.get('/chatroom', function(request, response) {
//   response.render('pages/chatroom');
// });
//
// app.listen(app.get('port'), function() {
//   console.log('Server started on port:', app.get('port'));
// });
