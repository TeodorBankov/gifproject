const fetch = require("node-fetch");
const fs = require("fs");
function func(gif) {
    fetch(gif)
        .then(json => console.log(json));   
}

module.exports = func;