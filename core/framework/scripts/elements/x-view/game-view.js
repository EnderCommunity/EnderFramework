var THIS = null;
module.exports = {
    start: function(element) {
        THIS = element;
    },
    engine: require("./../../../../engine/initiate")
};