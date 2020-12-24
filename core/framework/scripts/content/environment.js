module.exports = {
    original: {
        alert: function(text) {
            return chromeAlert(text);
        }
    },
    ReceiverEnabled: true,
    events: {},
    /*addEventListener: function(channel, callback){
      if(this.events[channel] == undefined){
        this.events[channel] = [];
      }
      this.events[channel][this.events[channel].length] = callback;
    },*/
    EventReceiver: function(channel, data) {
        if (this.ReceiverEnabled) {
            if (this.events[channel] != undefined) {
                for (var i = 0; i < this.events[channel].length; i++) {
                    this.events[channel][i](data);
                }
            }
        }
    },
    actions: {
        Copy: function() {
            document.execCommand('copy');
        },
        Paste: function() {
            document.execCommand("paste")
        },
        Cut: function() {
            document.execCommand("cut");
        },
        Delete: function() {
                ContextMenuElement_.value = '';
            }
            /*
            global.ContextMenuFunction_Copy
            ENDERFRAMEWORK_ENVIRONMENT.actions.
            global.ContextMenuFunction_Paste
            global.ContextMenuFunction_Cut
            global.ContextMenuFunction_Delete*/
    },
    elements: {
        requestedCustomElements: [],
        warn: function(message) {
            console.warn("%c Custom Elements Warning:", "font-weight: bold;", message);
        },
        error: function(message) {
            console.error("%c Custom Elements Error:", "font-weight: bold;", message);
        },
        floatingActionButton: [] ////Add floating action buttons in here!
    },
    elementActions: {
        floatingButtonClicked: (id, content) => {
            ipcRenderer.sendToHost('enderframework--floatingaction-click', [id, content]);
        }
    },
    closingEvent: {
        done: () => {
            ipcRenderer.sendToHost('enderframework--waitbeforeclosing-done');
        }
    },
    closeDialogs: () => {
        ipcRenderer.sendToHost('enderframework--dialogs-close');
    },
    isThereNoTop: (callback) => {
        if (document.getElementsByTagName("top").length == 0)
            document.body.insertBefore(document.createElement('space'), document.body.firstChild);
    },
    tell: {
        done: function() {
            if (!isContentLoading) {
                ipcRenderer.sendToHost('environment--tell-done');
                //window.scrollTo(0, 0);
            } else
                var loop = setInterval(function() {
                    if (!isContentLoading) {
                        clearInterval(loop);
                        ipcRenderer.sendToHost('environment--tell-done');
                        //window.scrollTo(0, 0);
                    }
                }, 10);
        },
        fire: function(event, args) {
            ipcRenderer.sendToHost(event, args);
        }
    },
    resources: require("./resources"),
    parse: {
        src: require("./../../../src-parser"),
        code: function(data) {
            var result = [],
                length = data.replace(/[^\n]/g, "").length + 1;
            for (var i = 0; i < length; i++) {
                var currentLineData = {},
                    line = data.substring(0, (data.indexOf("\n") > -1) ? data.indexOf("\n") : data.length).replace(/\s/g, ""),
                    isThereAComment = false,
                    isThereAnAttribute = false,
                    isStrict = false;
                if (line.indexOf("@") == 0) {
                    line = line.substring(1);
                    isStrict = true;
                }
                currentLineData.strict = isStrict;
                currentLineData.comment = line.substring((line.indexOf("##") > -1) ? line.indexOf("##") : line.length, line.length);
                isThereAComment = (line.indexOf("##") > -1);
                line = line.replace(/\s/g, "");
                line = line.substring(0, (line.indexOf("##") > -1) ? line.indexOf("##") : line.length);
                currentLineData.action = line.substring(0, line.indexOf("`"));
                line = line.substring(line.indexOf("`") + 1);
                currentLineData.value = line.substring(0, line.indexOf("`"));
                currentLineData.attribute = line.substring((line.indexOf("!") > -1) ? line.indexOf("!") + 1 : 0, line.length);
                isThereAnAttribute = (line.indexOf("!") > -1);
                currentLineData.comment = (isThereAComment) ? currentLineData.comment : null;
                currentLineData.action = (currentLineData.action == "") ? null : currentLineData.action;
                currentLineData.value = (currentLineData.value == "") ? null : currentLineData.value;
                currentLineData.attribute = (isThereAnAttribute) ? currentLineData.attribute : null;
                result[result.length] = currentLineData;
                data = data.substring(data.indexOf("\n") + 1);
            }
            return result;
        }
    }
};