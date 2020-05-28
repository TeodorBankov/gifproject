const fs = require("fs");
const mkdir = require("mkdirp");
const deldir = require("del");

let exported = {
    /**
    * Clears ./cached-gif foulder
    * @return  Void
    */
    clear: function () {
        return new Promise((res, rej) => {
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
            res("OK");
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
    },

    dirm: async function () {
        await deldir(['./cached-gif/']);
    }

}

module.exports = exported;