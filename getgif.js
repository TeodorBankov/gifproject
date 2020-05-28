require('dotenv/config');
const giphy = require('giphy-api')(process.env.GIF_KEY);

async function fetchGif(gif) {
	return await giphy.search(gif);
}

async function storeGif(args) {
	try {
		const dl = require('download-file');
		const gifs = await fetchGif(args[0]);
		const gifData = gifs.data[Math.floor(Math.random() * gifs.pagination.count)];
		const gif = `https://media.giphy.com/media/${gifData.id}/giphy.gif`;
		await dl(gif, { directory: './cached-gifs/', filename: `gif-${gifData.id}.gif` }, (e) => {
			if (e) throw e;
		});
	} catch (e) {
		console.log('The GIF API returned an error!');
		process.exit(0);
	}
}

module.exports = storeGif;
