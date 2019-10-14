const fetch = require("node-fetch");
const http = require("https");
const fs = require("fs");

function func(gif) {
    fetch(gif).then(gifed => {
        const file = fs.createWriteStream("./cached-gif/" + Math.floor(Math.random() * 100000) + ".gif");
        http.get(gifed.url, response => {
            response.pipe(file);
        });
    });
}

module.exports = func;