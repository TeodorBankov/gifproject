const fs = require("fs");

let exported = {
    clear: function () {
        fs.readdir("./cached-gif/", (e, files) => {
            if (e) console.log(e);
            files.forEach((f, i) => {
                fs.unlink("./cached-gif/" + f, e => {
                    if (e) console.log(e);
                });
            });
        });
    },
    set: function () {
        setInterval(() => {
            this.clear();
        }, 10000);
    }
}

module.exports = exported;