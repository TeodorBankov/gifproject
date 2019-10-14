require("dotenv").config();
const giphy = require("giphy-api")(process.env.KEY);
const fetch_gif = require("./fetch-gif");

let gif;
fetch_gif(giphy).then(g => gif = g).catch(e => console.log(e));

let thing = require("./code");
console.log(thing);
