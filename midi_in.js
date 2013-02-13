var midi = require('midi');
//~ var io = require('socket.io');

var output = new midi.output();
var input = new midi.input();
input.on('message', function(deltaTime, message) {
    console.log(message)
    var channel=message[0] & 0x0f 
    var type=message[0] & 0xf0
    type >>= 4
    var control=message[1];
    var value=message[2];
    console.log("type: "+type+' ch:' + channel + " control:" +control+" val:"+ value);

//~     0   0   0   0   0000
//~     128 64  32  16  8421
//~                     1010
//~                     A
                    //~ 0000 1111
                    //~ F
//~ 01=0 00=0 11=1

}); 

//~ io.sockets.on('connection', function (socket) {
  //~ socket.emit('news', { hello: 'world' });
  //~ socket.on('my other event', function (data) {
    //~ console.log(data);
  //~ });
//~ })


// make it open lpd8 only
//~ console.log(input.getPortName(1))
input.openPort(1);

//~ output.openPort(1);
//~ a=setInterval(function(){output.sendMessage([131,53,127])},500)
//~ b=setInterval(function(){output.sendMessage([147,53,127])},300)
//~ function X(){clearInterval(a),clearInterval(b)}
// Send a MIDI message.
//~ var a=0;

//~ output.openPort(2);
//~ setInterval(function(){
    //~ a++
    //~ output.sendMessage([146,36,127]);
    //~ if (a%2) output.sendMessage([146,38,127]);
    
//~ },500)
// Close the port when done.

//~ setTimeout(function(){output.closePort()},10000);

