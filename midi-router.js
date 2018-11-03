var midi = require('midi');

var output = new midi.output();
var input = new midi.input();

input.on('message', function(deltaTime, message) {

  var channel=message[0] & 0x0f;
  var type=message[0] & 0xf0;
  type >>= 4;
  var control=message[1]; //CC number
  var value = message[2];
  if (channel==0)
      value[control-1] = message[2]/127;
  else if (channel==1)
      r[control-9] = message[2]/127;
  console.log(deltaTime, message);
  //~ console.log(message[2])
}); 
output.openPort(1);

// x = input.openPort(3);
// y = input.openPort(4);
z = input.openPort(2);
for (let port = input.getPortCount() - 1; port >= 0; port--){
  console.log('port', port, input.getPortName(port));
}

