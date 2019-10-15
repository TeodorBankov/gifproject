const fs = require("fs");

function get(giphy) {
    return new Promise((res, rej) => {
        fs.readFileSync("config.json");
        giphy.search(config.search).then(gif => {
            res(gif);
        });
    });
}

module.exports = get;
