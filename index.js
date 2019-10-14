require("dotenv").config();
const giphy = require("giphy-api")(process.env.KEY)
let thing = require("./code");
console.log(thing);