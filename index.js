require("dotenv").config();
const giphy = require("giphy-api")(process.env.KEY);
const fetch_gif = require("./fetch-gif");

let main = async function () {
    let gif;
    await fetch_gif(giphy).then(g => gif = g).catch(e => console.log(e));
    console.log(gif);
}

main();