// var express = require('express');
// var app = express();

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/pages/index.html');
});

app.get('/chatroom', (req, res) => {
  res.render(__dirname + '/views/pages/chatroom.ejs');
});

app.get('/showcode', (req, res) => {
  res.render(__dirname + '/views/pages/showcode.ejs');
});

app.get('/motion', (req, res) => {
  res.render(__dirname + '/views/pages/interface+motion/motion.ejs');
});

app.get('/interface', (req, res) => {
  res.render(__dirname + '/views/pages/interface+motion/interface.ejs');
});

app.get('/interface-circle', (req, res) => {
  res.render(__dirname + '/views/pages/interface+motion/interface-circle.ejs');
});

app.get('/motion2', (req, res) => {
  res.render(__dirname + '/views/pages/interface+motion/motion2.ejs');
});

app.get('/epilepsia-circle', (req, res) => {
  res.render(__dirname + '/views/pages/interface+motion/epilepsia-circle.ejs');
});

app.get('/epilepsia-mobile', (req, res) => {
  res.render(__dirname + '/views/pages/interface+motion/epilepsia-mobile.ejs');
});

app.get('/motion-dom', (req, res) => {
  res.render(__dirname + '/views/pages/interface+motion/motion-dom.ejs');
});

const sprites = {};

io.on('connection', (socket) => {
  console.warn('New connect');
  socket.on('disconnect', () => {
    console.log('Connection is turned off');
  });
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    console.log(`message: ${msg}`);
  });

  socket.emit('interface+motion_listen', sprites);
  socket.on('interface+motion_send', (data) => {
    if (socket.id in sprites) {
      switch (data.command) {
        case 'right':
          sprites[socket.id].x += 60;
          break;
        case 'left':
          sprites[socket.id].x -= 60;
          break;
        default:
      /* code */
          break;
      }
    } else {
      sprites[socket.id] = {
        x: 350,
        y: 280,
      };
    }

    socket.broadcast.emit('interface+motion_listen', sprites);
  });
});

http.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
