var path = require("path");
module.exports = function(root, src, ext = null) {
    var newSrc = root;
    src = src.split(".");
    for (var i = 0; i < src.length; i++) {
        if (i == src.length - 1 & ext != null)
            newSrc = path.join(newSrc, `${src[i]}.${ext}`);
        else
            newSrc = path.join(newSrc, src[i]);
    }
    return newSrc;
}