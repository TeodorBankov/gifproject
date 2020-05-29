var AudioContext = require("web-audio-api").AudioContext;
var MusicTempo = require("music-tempo");
var fs = require("fs"); 
let bpms = 0;

var calcTempo = async function (buffer) {
  var audioData = [];
  // Take the average of the two channels
  if (buffer.numberOfChannels == 2) {
    var channel1Data = buffer.getChannelData(0);
    var channel2Data = buffer.getChannelData(1);
    var length = channel1Data.length;
    for (var i = 0; i < length; i++) {
      audioData[i] = (channel1Data[i] + channel2Data[i]) / 2;
    }
  } else {
    audioData = buffer.getChannelData(0);
  }
  var mt = new MusicTempo(audioData);
 
  //console.log(mt.tempo);
  function returnVal(){
      return mt.tempo;
    }
    bpms = returnVal();
}
 
var data = fs.readFileSync("./cached-songs/czTksCF6X8Y.flac");
 
var context = new AudioContext();
context.decodeAudioData(data, calcTempo);
setTimeout(function() {
  console.log("AND IT HAS WORKED "+bpms);
}, 4000);
