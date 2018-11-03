var alpha, beta, gamma, xCard;
var socket = io();

var p2p = new P2P(socket);

p2p.on('ready', function(){
  p2p.usePeerConnection = true;
  //p2p.usePeerConnection = false;
})

var canSend;
setInterval(()=>{
  canSend = 1;
}, 100);

function send(type, msg){
  // if (!canSend){return}
  // socket.emit(type, msg);
  p2p.emit(type, msg);
  canSend = 0;
}

var noteOffTimeout =[]

p2p.on('midi', (msg)=>{
  console.log('should send midi now', Date.now() - parseInt(msg.now));
  clearTimeout(noteOffTimeout['_' + msg.value])
  midiOut.send([0x90, msg.value, 127])
  noteOffTimeout['_'+msg.value] = setTimeout(()=>{
    midiOut.send([0x80, msg.value, 127])
  }, 500)
})
	var xCard;

var midiOut;


$(function () {  
  var receiver;
	if (!('ondeviceorientation' in window)) {
		// unsupported
	} else {
		window.addEventListener('deviceorientation', function(event) {
      
      send('deviceorientation',{
				beta : event.beta, 
        gamma : event.gamma,
        alpha : event.alpha,
        absolute: event.absolute,
        timestamp : Date.now()
			});
		});
	}
	if (!('ondevicemotion' in window)) {
		// unsupported
	} else {
		window.addEventListener('devicemotion', function(event) {
      return;
			send('devicemotion', {
				aX : event.acceleration.x,
				aY : event.acceleration.y,
				aZ : event.acceleration.z,
				aGX : event.accelerationIncludingGravity.x,
				aGY : event.accelerationIncludingGravity.y,
				aGZ : event.accelerationIncludingGravity.z,
				rB : event.rotationRate.beta,
				rG : event.rotationRate.gamma,
				rA : event.rotationRate.alpha,
				interval : event.interval,
        timestamp : Date.now()
      });
		});
	}
  
  
  $('#button1').css('cursor','pointer');
  $('#button1').on('click touchend', (e) => {
    send('note', {"type":"note", "value" : 48, now: Date.now()});
    e.preventDefault();
  })
  
  $('#button2').on('click touchend', (e) => {
    send('note', {"type":"note", "value" : 50, now: Date.now()});
    e.preventDefault();
  })

  $('#button3').on('click touchend', (e) => {
    send('note', {"type":"note", "value" : 52, now: Date.now()});
    e.preventDefault();
  })
  $('#button4').on('click touchend', (e) => {
    send('note', {"type":"note", "value" : 53, now: Date.now()});
    e.preventDefault();
  })

  riot.settings.brackets = '{{ }}';    
  
  riot.compile(function() {
    xCard = riot.mount('x-card', {socket : socket})[0];
  });
  
});
