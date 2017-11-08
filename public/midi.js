function _initMidi(){
  let beat = 0;

	if (typeof navigator.requestMIDIAccess === 'undefined') {
    console.error('no midi!')
  };
  
	navigator.requestMIDIAccess().then(function(midiAccess){
		(function startLoggingMIDIInput( midiAccess, indexOfPort ) {


		  midiAccess.inputs.forEach( function(entry) {
        
        if (entry.name !== "LoopBe Internal MIDI" ){
          console.log('entry', entry)
          entry.onmidimessage = onMIDIMessage;
        }
      });
      
      midiAccess.outputs.forEach((entry)=>{
        if (entry.name === "LoopBe Internal MIDI"){
          midiOut = entry;
          send('receiver');
        }
        // console.log(entry);
      })
		})(midiAccess);
    
		function onMIDIMessage( event ) {
		  var str = "";
      console.log(event.data);
		  for (var i=0; i<event.data.length; i++) {
			  str += "0x" + event.data[i].toString(16) + " ";
		  }
		  // console.log( event.timeStamp, str );
		}
    
	}); // then
}

_initMidi();