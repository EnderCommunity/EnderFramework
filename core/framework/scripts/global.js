const electron = require("electron"),
    osInfo = require("./../platform"),
    os = require('os'),
    { remote, ipcRenderer } = electron,
    { app, nativeTheme } = remote,
    //os = require('os'),
    fs = require("fs"),
    opn_ = require("opn"),
    ChromecastAPI = require('chromecast-api'),
    _changeContextMenuTopValue = function(value) {
        return (value + _content.offsetTop);
    },
    _webviewFinishedLoading = function() {
        //
    };
var firstLoad = true,
    loadAfterError = false,
    isThereError = false,
    _shouldWait = false,
    currentCountdown_notify = null,
    stopThemeAutoChange = false,
    resources = {
        css: {
            main: null,
            font: null,
            icons: null,
            animations: null,
            customElements: {
                //
            }
        },
        js: {
            //customElements: null,
            //modifications: null
        }
    },
    customTopBarColorDone = false,
    customTopBarColor = null,
    didHideIcon = false,
    lockTopBarBlur = false,
    autoHideIsOn = false,
    topBarBlur = function(bool) {
        if (!lockTopBarBlur && autoHideIsOn) {
            if (bool) {
                Window_TopBar.classList.add("loaded");
                Window_TopBar.setAttribute("style", Window_TopBar.getAttribute("style").replace(/ helper: inserted; background: transparent;/g, ""));
            } else {
                Window_TopBar.classList.remove("loaded");
                Window_TopBar.setAttribute("style", `${Window_TopBar.getAttribute("style")} helper: inserted; background: transparent;`);
            }
        }
    };