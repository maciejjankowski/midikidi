var midi = require('midi');
var nconf = require('nconf')
nconf.env().file({file: 'settings.json'});

// settings for FPC intrument
var RS= 37; var $11= 37;
var BD= 36; var $12=  36;
var CH= 42; var $13=  42;
var CB= 82; var $14=  82;
var SD1= 40; var $21=  40;
var SD2= 38; var $22=  38;
var OH= 46; var $23=  46;
var PH= 44; var $24=  44;
var T1= 48; var $31=  48;
var T2= 47; var $32=  47;
var T3= 45; var $33=  45;
var T4= 43; var CP= 43; var $34=  43;
var CR= 49; var $41=  49;
var TB= 55; var $42=  55;
var LC= 51; var $43=  51;
var CY= 53; var $44=  53;

// Set up a new output.
var output = new midi.output();
var input = new midi.input();
input.on('message', function(deltaTime, message) {
    var channel=message[0] & 0x0f 
    var type=message[0] & 0xf0
    type >>= 4
    var control=message[1]-1;
    value[control]=message[2]/127;
    //~ console.log(control)
    //~ console.log(message[2])
}); 
output.openPort(1);
input.openPort(1);
console.log(input.getPortName(1));
var tempo = 60000/120;
tempo/=4;

function midiapi(port){
    this.timeline=new Array();
    this.timeline["BD"]=nconf.get('BD')
    this.timeline["SD"]=nconf.get('SD')
    this.timeline["RS"]=nconf.get('RS')
    this.timeline["OH"]=nconf.get('OH')
    this.timeline["CH"]=nconf.get('CH')
    this.velocity= // unused
        [
            0,  0,  0,  0.5,
            0,  0,  0,  0.7,
            0,  0,  0,  0.9,
            0,  0,  0,  0
        ]
    this.t = function (note){ //translate note from A#1 to a number
        var notes=[9,11,0,2,4,5,7];//abcdef...
        if (typeof note=="string"){
            note=note.toUpperCase();
            if (note.length==2){
                octave=note.charAt(1)
                note=note.charCodeAt(0)
                note = octave*12 + notes[note-65]
                //~ console.log(note)
                return note;
            } else {
                octave=note.charAt(2)
                note=note.charCodeAt(0)
                note=octave*12 + notes[note-65]+1
                //~ console.log(note)
                return note;
            } // if len
        }// note string
        else{ // this is still useful for stuff like t(BD) or t(41) or sth, IDK
            return note
        } //note number
    }// endf
    this.no = function(note,v){
        port.sendMessage([131,this.t(note),v])
    }
    this.n = function(note,v,t){
        port.sendMessage([146,this.t(note),v]);
        //setTimeout(function(){this.no.bind(midiapi,this.t(note),v,t)}) // never figured out how to settimeout for note off, something breaks
    }
}

var m = new midiapi(output);
var i=0;
var value=[0.3,0.1,0,0.7,0.3]; // initial values
function cycle(){
    i++; 
    //~ console.log(value[0])
    if( m.timeline["BD"][i%m.timeline["BD"].length] + value[0] >= 1) m.n(BD,100) //BD
    if( m.timeline["SD"][i%m.timeline["SD"].length] + value[1] >= 1) m.n(SD1,110) // SD
    if( m.timeline["RS"][i%m.timeline["RS"].length] + value[2] >= 1) m.n(RS,63) // side
    if( m.timeline["CH"][i%m.timeline["CH"].length] + value[3] >= 1) m.n(CH,40) // CH
    if( m.timeline["OH"][i%m.timeline["OH"].length] + value[4] >= 1) m.n(OH,70) // OH
}

a=setInterval(function(){cycle()},tempo)
//===============================================================================
//~ output.closePort() // never happened anyway :(
