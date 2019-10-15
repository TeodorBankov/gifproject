require("dotenv").config();
const giphy = require("giphy-api")(process.env.KEY);
const fetch_gif = require("./fetch-gif");
const store_gif = require("./storegifs");
const cache_mng = require("./cache-mng");
const fs = require("fs");

let rawdata = fs.readFileSync("config.json");
let config = JSON.parse(rawdata);

let main = async function () {
    let gif;

    for (let i; i < 10; i++) {
        await fetch_gif(giphy).then(g => gif = g).catch(e => console.log(e));
        await store_gif(gif.data[Math.floor(Math.random() * gif.data.length)].images["original"].url);
    }
    
    setInterval(async () => {
        await fetch_gif(giphy).then(g => gif = g).catch(e => console.log(e));
        await store_gif(gif.data[Math.floor(Math.random() * gif.data.length)].images["original"].url);
    }, 2000);

    setInterval(async () => {
        await cache_mng.clear();
    }, 20000);
}

process.stdin.resume();
process.stdin.setEncoding("utf8");

process.stdin.on("data", async chunk => {
    let lines = chunk.split("\n");
    let args = lines[0].split(" ");

    if (args[0] == "exit") {
        process.exit();
    } else if (args[0] == "config") {
        switch (args[1]) {
            case "search":
                config.search = args.slice(2).join(" ") || "Trippy";
                fs.writeFileSync("config.json", JSON.stringify(config));
                break;
            default:
                console.log("Missing arguments");
        }
    }
})

main();