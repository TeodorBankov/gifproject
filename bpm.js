const AudioContext = require('web-audio-api').AudioContext;
const MusicTempo = require('music-tempo');
const fs = require('fs').promises;

const calcTempo = (buffer) => {
	let audioData = [];
	if (buffer.numberOfChannels == 2) {
		const channel1Data = buffer.getChannelData(0);
		const channel2Data = buffer.getChannelData(1);
		const length = channel1Data.length;
		for (let i = 0; i < length; i++) {
			audioData[i] = (channel1Data[i] + channel2Data[i]) / 2;
		}
	} else {
		audioData = buffer.getChannelData(0);
	}
	const mt = new MusicTempo(audioData);
	return mt;
};

const getTempo = async (file) => {
	const data = await fs.readFile(file);
	const context = new AudioContext();
	return context.decodeAudioData(data, calcTempo);
};

module.exports = getTempo;
