const fs = require('fs');
const getGif = require('./getgif');
const args = process.argv.slice(2);
const opn = require('opn');
const port = process.env.PORT || 6969;
const getBPM = require('./bpm');

if (args.length < 2) {
	console.log('Correct syntax: node main.js <gif> <link to youtube>');
	process.exit(0);
}

getBPM('./cached-songs/R9eC3WBRKeY.flac').then((data) => {
	console.log(data);
});

async function getVideo() {
	const ytdl = require('ytdl-core');
	return new Promise((res, rej) => {
		const id = `cached-songs/${ytdl.getVideoID(args[1])}.flac`;
		function fetchVideo() {
			ytdl(args[1]).pipe(
				fs.createWriteStream(id).on('close', () => {
					res(id);
				})
			);
		}
		try {
			if (fs.existsSync(id)) res(id);
			if (fs.existsSync('cached-songs/')) fetchVideo();
			else
				fs.mkdir('cached-songs', () => {
					fetchVideo();
				});
		} catch (e) {
			rej(e);
		}
	});
}

async function playMusic() {
	try {
		const rimraf = require('rimraf');
		const sound = require('sound-play');
		const gad = require('get-audio-duration');
		const dir = await getVideo();
		const path = require('path');
		const fullDir = path.join(__dirname, dir);
		const duration = (await gad.getAudioDurationInSeconds(dir)) + 1;
		console.log(`Song duration is ~${Math.round(duration)}s`);
		setTimeout(() => {
			console.log('Song finished! Clearing cache...');
			rimraf('cached-gifs', () => {
				rimraf('cached-songs', () => {
					console.log('Cache cleared!');
				});
			});
		}, duration * 1000);
		await sound.play(fullDir);
	} catch (e) {
		console.log(e);
		process.exit(0);
	}
}

getGif(args);

playMusic()
	.then(() => {
		const express = require('express');
		const exphbs = require('express-handlebars');

		const app = express();

		app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
		app.set('view engine', 'handlebars');

		app.get('/', (req, res) => {
			res.render('gifs');
		});

		app.listen(port);
	})
	.then(() => {
		opn(`localhost:${port}`);
	});
