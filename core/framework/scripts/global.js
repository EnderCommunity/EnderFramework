const { remote } = require("electron"), { app, nativeTheme } = remote, os = require('os'), fs = require("fs"), opn_ = require("opn"), ChromecastAPI = require('chromecast-api'), _changeContextMenuTopValue = function (value) {
    return (value + _content.offsetTop);
}, _webviewFinishedLoading = function () {
    //
};
var firstLoad = true, _shouldWait = false, currentCountdown_notify = null, stopThemeAutoChange = false, resources = {
    css: {
        main: null,
        font: null,
        icons: null,
        animations: null
    },
    js: {
        customElements: null,
        modifications: null
    }
}, customTopBarColorDone = false, customTopBarColor = null;