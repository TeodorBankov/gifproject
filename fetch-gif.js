const fs = require("fs");

function get(giphy) {
    return new Promise((res, rej) => {
        let config = fs.readFileSync("config.json");
        config = JSON.parse(config);
        giphy.search(config.search).then(gif => {
            res(gif);
        });
    });
}

module.exports = get;
