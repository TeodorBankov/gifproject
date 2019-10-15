const fs = require("fs");
const mkdir = require("mkdirp");

let exported = {
    /**
    * Clears ./cached-gif foulder
    * @return  Void
    */
    clear: function () {
        fs.readdir(__dirname + "/cached-gif/", (e, files) => {
            if (e) {
                if (e.code == "ENOENT") return mkdir(__dirname + "/cached-gif/", e => {if (e) console.log(e)});
            }
            console.log(files)
            files.forEach((f, i) => {
                fs.unlink(__dirname + "/cached-gif/" + f, e => {
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