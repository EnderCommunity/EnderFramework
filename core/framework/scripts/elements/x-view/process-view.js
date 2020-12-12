var path = require("path"),
    THIS = null;
module.exports = {
    start: function(element) {
        THIS = element;
    },
    startProcess: function(src) {
        //path.join(paths.currentApp, src);
        var child = require('child_process').exec('python celulas.py')
        child.stdout.pipe(process.stdout)
        child.on('exit', function() {
            process.exit();
        });
    }
};