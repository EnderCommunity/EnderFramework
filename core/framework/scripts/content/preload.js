//console.log(0);
global.ipcRenderer = require("electron").ipcRenderer;
const remote = require("electron").remote;
//ipcRenderer.sendToHost('paths--send');
global.isContentLoading = true;

global.chromeAlert = alert;
global.areCustomElementsLoaded = false;
var dialog = require("./dialog");
dialog.dialog;
alert = dialog.alert;
global.paths = remote.getGlobal('paths');

if (location.protocol == "file:") {
    document.addEventListener("DOMContentLoaded", function () {
        (require("./theme"))();
        (require("./media"))();
        (require("./tooltip"))();
        (require("./modifications"))();
        //document.body.style.background = "blue";
    });
    global.EnderFramework = require("./framework");
} else {
    console.error("Accessing EnderFramework APIs from https:/http: protocols is not allowed!");
}
window.addEventListener('load', function () {
    isContentLoading = false;
});

global.ENDERFRAMEWORK_ENVIRONMENT = require("./environment");

window.onerror = function (message, source, lineno, colno, error) {
    ipcRenderer.sendToHost('reportingsystem--window', [message, source, lineno, colno, error]);
};
process.on('uncaughtException', function (message, source, lineno, colno, error) {
    ipcRenderer.sendToHost('reportingsystem--process', [message, source, lineno, colno, error]);
});
