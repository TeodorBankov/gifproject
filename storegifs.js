const fetch = require("node-fetch");
const dl = require("download-file");

function func(gif) {
    fetch(gif).then(gifed => {
        dl(gifed.url, { directory: "./cached-gif/", filename: Math.floor(Math.random() * 1000) + ".gif", function(e) { if (e) console.log(e); } });
    });
}

module.exports = func;