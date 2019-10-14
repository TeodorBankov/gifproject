require("dotenv").config();
const giphy = require("giphy-api")(process.env.KEY);
const fetch_gif = require("./fetch-gif");
const store_gif = require("./storegifs");
const cache_mng = require("./cache-mng");

let main = async function () {
    let gif;
    setInterval(async () => {
        for (let i = 0; i < 10; i++) {
            await fetch_gif(giphy).then(g => gif = g).catch(e => console.log(e));
            await store_gif(gif.data[Math.floor(Math.random() * gif.data.length)].images["original"].url);
        }
    }, 60000);
    await cache_mng.set();
}

main();