require('dotenv/config');
const giphy = require('giphy-api')(process.env.GIF_KEY);

async function fetchGif(gif) {
	return await giphy.search(gif);
}

async function storeGif(args, count) {
	let gifArr = [];
	let gifs = await fetchGif(args[0]),
		gifData = gifs.data[Math.floor(Math.random() * gifs.pagination.count)],
		gif = `https://media.giphy.com/media/${gifData.id}/giphy.gif`;
	for (let i = 0; i < count; i++) {
		try {
			const dl = require('download-file');

			const initGif = async () => {
				gifs = await fetchGif(args[0]);
				gifData = gifs.data[Math.floor(Math.random() * gifs.pagination.count)];
				gif = `https://media.giphy.com/media/${gifData.id}/giphy.gif`;
				if (gifArr.find(`gif-${gifData.id}.gif`)) {
					initGif();
				}
			};

			await dl(gif, { directory: './cached-gifs/', filename: `gif-${gifData.id}.gif` }, (e) => {
				if (e) throw e;
				gifArr = [ ...gifArr, `cached-gifs/gif-${gifData.id}.gif` ];
			});
		} catch (e) {
			console.log('The GIF API returned an error!');
			console.log(e);
			process.exit(0);
		}
	}
	return gifArr;
}

module.exports = storeGif;
