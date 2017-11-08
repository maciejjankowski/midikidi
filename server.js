// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

app.use(express.static('public'));

var receiverId;

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

let controls = {
  'pan' : {'type':'cc', 'value':'22'},
  'filterFrequency' : {'type':'cc', 'value':'23'},
  'filterResonance' : {'type':'cc', 'value':'24'},
  'clip1' : {'type':'cc', 'value':'24'},
  'clip2' : {'type':'cc', 'value':'24'},
  'clip3' : {'type':'cc', 'value':'24'},
  'clip4' : {'type':'cc', 'value':'24'},
  'clip5' : {'type':'cc', 'value':'24'},
  'clip6' : {'type':'cc', 'value':'24'},
}


var io = require('socket.io')(listener);

io.on('connection', function(socket){
  console.log('io connection! :-)')
  
  socket.on('deviceorientation', function(msg){
    // console.log('message: ',  msg);
    socket.broadcast.emit('o', msg);
    //socket.broadcast.emit('deviceorientantion', msg);
  });
  
  socket.on('devicemotion', (msg) => {
    console.log('message: ',  msg);
  })
  
  socket.on('receiver',() => {
    // socket.broadcast.emit('receiver', socket.id);
    receiverId = socket.id;
    console.log(socket.id)
  })
  
  socket.on('ui', (pos) => {
    // io.emit('some event', { for: 'everyone' });
  })
  
  socket.on('button', (data) => {
    io.emit('button', data);
  })
  
  socket.on('note', function(msg){
    console.log('message: ',  msg, "to", receiverId, Date.now() - parseInt(msg.now));    
    // socket.to(receiverId).emit('midi', msg);
    socket.broadcast.emit('midi', msg);
  });
  
});
