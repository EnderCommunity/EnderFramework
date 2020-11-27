module.exports = {
    original: {
        alert: function (text) {
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
    EventReceiver: function (channel, data) {
        if (this.ReceiverEnabled) {
            if (this.events[channel] != undefined) {
                for (var i = 0; i < this.events[channel].length; i++) {
                    this.events[channel][i](data);
                }
            }
        }
    },
    actions: {
        Copy: function () {
            document.execCommand('copy');
        },
        Paste: function () {
            document.execCommand("paste")
        },
        Cut: function () {
            document.execCommand("cut");
        },
        Delete: function () {
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
        floatingActionButton: []////Add floating action buttons in here!
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
        done: function () {
            if (!isContentLoading) {
                setTimeout(function () {
                    ipcRenderer.sendToHost('environment--tell-done');
                }, 200);
            } else
                var loop = setInterval(function () {
                    if (!isContentLoading) {
                        clearInterval(loop);
                        setTimeout(function () {
                            ipcRenderer.sendToHost('environment--tell-done');
                        }, 200);
                    }
                }, 10);
        }
    }
};