require("dotenv").config();
const giphy = require("giphy-api")(process.env.KEY);
const fetch_gif = require("./fetch-gif");
const store_gif = require("./storegifs");

let main = async function () {
    let gif;
    await fetch_gif(giphy).then(g => gif = g).catch(e => console.log(e));
    await store_gif(gif.data[0].url);
    console.log(gif.data[0].url);
}

main();

    