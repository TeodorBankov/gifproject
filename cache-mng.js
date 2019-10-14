const fs = require("fs");

let exported = {
    /**
    * Clears ./cached-gif foulder
    * @return  Void
    */
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
    /**
    * Creates interval of 5m
    * @returns Void
    */
    set: function () {
        setInterval(() => {
            this.clear();
        }, 300000);
    }
}

module.exports = exported;