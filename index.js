require("dotenv").config();
const giphy = require("giphy-api")(process.env.KEY);
const fetch_gif = require("./fetch-gif");
const store_gif = require("./storegifs");
const cache_mng = require("./cache-mng");

let main = async function () {
    let gif;
    var timer = 1;
    setInterval(async () => {
       timer++; 
       console.log(timer);
    }, 1000);
    setInterval(async () => {
    if(timer%10==0){
        for (let i = 0; i < 10; i++) {
        await fetch_gif(giphy).then(g => gif = g).catch(e => console.log(e));
        await store_gif(gif.data[Math.floor(Math.random() * gif.data.length)].images["original"].url);
          }
    timer = 1;
    }
    await cache_mng.set();
    await cache_mng.clear();
    }, 1000);   
}
//needs a function update.
main();