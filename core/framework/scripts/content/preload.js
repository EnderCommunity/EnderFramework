//console.log(0);
global.ipcRenderer = require("electron").ipcRenderer;
const remote = require("electron").remote;
//ipcRenderer.sendToHost('paths--send');
global.isContentLoading = true;

if (location.protocol == "file:") {
    ipcRenderer.sendToHost('event--loadStyle');
    var checkExist = setInterval(function() {
        if (typeof document.documentElement != "undefined" && document.documentElement != null) {
            clearInterval(checkExist);
            (require("./theme"))();
        }
    }, 5);
    global.chromeAlert = alert;
    global.areCustomElementsLoaded = false;
    var dialog = require("./dialog");
    //dialog.dialog;
    alert = dialog.alert;
    global.paths = remote.getGlobal('paths');
    //
    global.request = require("./request");
    (require("../elements/request/element"))();
    (require("../elements/request/media"))();
    //(require("./../elements/request/resource"))();?
    document.addEventListener("DOMContentLoaded", function() {
        setTimeout(function() {
            isContentLoading = false;
        }, 600);
        //(require("./theme"))();
        //(require("./theme"))();
        //(require("./media"))();
        //(require("./tooltip"))();
        //(require("./modifications"))();
        //document.body.style.background = "blue";
    });
    global.EnderFramework = require("./framework");
} else {
    console.error("Accessing EnderFramework APIs from https:/http: protocols is not allowed!");
}

global.ENDERFRAMEWORK_ENVIRONMENT = require("./environment");

window.onerror = function(message, source, lineno, colno, error) {
    ipcRenderer.sendToHost('reportingsystem--window', [message, source, lineno, colno, error]);
};
process.on('uncaughtException', function(message, source, lineno, colno, error) {
    ipcRenderer.sendToHost('reportingsystem--process', [message, source, lineno, colno, error]);
});