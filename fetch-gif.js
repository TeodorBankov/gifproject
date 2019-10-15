function get(giphy) {
    return new Promise((res, rej) => {
        giphy.search("trippy").then(gif => {
            res(gif);
        });
    });
}

module.exports = get;


