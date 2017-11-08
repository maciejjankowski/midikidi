var alpha, beta, gamma, xCard;
var socket = io();
var canSend;
setInterval(()=>{
  canSend = 1;
}, 100);

function send(type, msg){
  // if (!canSend){return}
  if (typeof s === 'undefined'){
    s = socket;
  }
    s.emit(type, msg);
  canSend = 0;
}

var noteOffTimeout =[]

socket.on('midi', (msg)=>{
  console.log('should send midi now', Date.now() - parseInt(msg.now));
  clearTimeout(noteOffTimeout['_'+msg.note])
  midiOut.send([0x92, msg.note, 127])
  noteOffTimeout['_'+msg.note] = setTimeout(()=>{
    midiOut.send([0x82, 61, 127])
  }, 10000)
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

    send('click', {"button" : 1});
    send('note', {"note" : 61, now: Date.now()});
    e.preventDefault();
    console.log('kliks');
    $('#button1').fadeOut(900).fadeIn(100);
  })
  


  

  riot.settings.brackets = '{{ }}';    
  
  riot.compile(function() {
    xCard = riot.mount('x-card', {socket : socket})[0];
  });
  
});
