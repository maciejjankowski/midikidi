outputs=[];
navigator.requestMIDIAccess({sysex:true}).then(function(midiAccess){
    (function startLoggingMIDIInput( midiAccess, indexOfPort ) {
        midiAccess.outputs.forEach( function(entry) {
        outputs.push(entry);
        entry.open();
        });
    })(midiAccess);
}); // then

navigator.requestMIDIAccess().then(function(midiAccess){
    (function startLoggingMIDIInput( midiAccess, indexOfPort ) {
      midiAccess.inputs.forEach( function(entry) {entry.onmidimessage = onMIDIMessage;});
    })(midiAccess);
    function onMIDIMessage( event ) {
      var str = "";
      for (var i=0; i<event.data.length; i++) {
        str += "0x" + event.data[i].toString(16) + " ";
      }
      if (event.data[0]!=0xf8 && event.data[0] != 0xfe)
        console.log( event, str );
    }
}); // then