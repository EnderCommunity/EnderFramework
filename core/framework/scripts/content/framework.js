var dialog = require("./dialog");
const dialog_ = dialog.dialog;
var isOnCloseEnabled = false,
    isConfirmBeforeClosingEnabled = false,
    isConfirmBeforeClosingLocked = false;
const path = require("path"),
    currentPath = paths.currentApp;
const spawn = require('child_process').spawn,
    start_process = function(cb = function() {}) {
        f = path.join(currentPath, "process");
        var done____ = 0;
        const fs = require("fs"),
            done = function(t = true) {
                if (t)
                    done____++;
                else
                    cb(false);
                if (done____ >= 3 && t != false) {
                    cb(true);
                }
            };
        fs.mkdir(f, function(err) {
            if (true) {
                done();
                fs.mkdir(path.join(f, "executables"), function(err_) {
                    if (err_) {
                        console.error(err_)
                        done(false);
                    } else {
                        done();
                        done();
                    }
                });
            }
        });
    };
var menus = {};
const showAMenu = (menuID, position) => {
    ipcRenderer.sendToHost('enderframework--contextmenu-show', [menuID, position]);
};
/*
Add the following events to the content file
enderframework--contextmenu-create
enderframework--contextmenu-createreply
enderframework--contextmenu-remove
enderframework--contextmenu-removereply
enderframework--contextmenu-hideall
*/
var aes256 = require('aes256'),
    key = (function() {
        var result = '';
        var characters = (function() {
            var s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~`!@#$%^&*()_+-=[]{};:\'",.<>/?\\|';
            var arr = s.split('');
            var n = arr.length;
            for (var i = 0; i < n - 1; ++i) {
                var j = Math.floor(Math.random() * Math.random() * n);
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
            s = arr.join('');
            return s;
        })();
        var charactersLength = characters.length;
        for (var i = 0; i < 64; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    })();;
global.EnderFramework_ContextMenuActions = {
    //
    copy: () => {
        //
    },
    paste: () => {
        //
    },
    cut: () => {
        //
    },
    delete: () => {
        //
    },
    devTools: () => {
        //
    }
};
//The objects
function ContextMenu(id) {
    this.ID = id;
}
ContextMenu.prototype.attachTo = function(element, v = false) {
    var menuID = this.ID;
    try {
        element.addEventListener("contextmenu", function(e) {
            e.preventDefault();
            const rect = this.getBoundingClientRect();
            showAMenu(menuID, (!v) ? {
                top: rect.top + rect.height,
                left: rect.left
            } : {
                top: e.clientY,
                left: e.clientX
            });
        });
        return true;
    } catch {
        return false;
    }
};
const request = require('request'),
    fs = require("fs");

function Download(url, name) {
    this.name = name;
    //this.targetPath = path_ + "downloads\\" + Math.round(Math.random()*10000000000) + "-" + this.name;
    this.targetPath = path.join(paths.currentApp, "resources", "downloads", this.name);
    this.file_url = url;
    this.received_bytes = 0;
    this.total_bytes = 0;
    this.request = request({
        method: 'GET',
        uri: this.file_url
    });
    var out = fs.createWriteStream(this.targetPath);
    this.request.pipe(out);
    var _this = this;
    this.request.on('response', function(data) {
        _this.total_bytes = parseInt(data.headers['content-length']);
    });
}
Download.prototype.done = function(callback) {
    var p = this.targetPath;
    this.request.on('end', function() {
        callback(new LocalFile(p));
    });
}
Download.prototype.track = function(callback) {
    var _this = this;
    this.request.on('data', function(chunk) {
        _this.received_bytes += chunk.length;
        callback(_this.total_bytes, _this.received_bytes);
    });
};

function LocalFile(dir) {
    this.path = dir;
    this.name = path.basename(dir);
    this.extension = path.extname(dir);
}
LocalFile.prototype.delete = function() {
    if (this.path == null)
        return (function() {
            console.error("This LocalFile object isn't valid!");
            return false;
        })();
    fs.unlinkSync(this.path);
    this.path = null;
    return true;
}
LocalFile.prototype.getContent = function(callback) {
    fs.readFile(this.path, function(err, data) {
        callback(err, data);
    });
}
var https = require("https"),
    http = require("http");

function LocalHost(localPath, port, ip, options) {
    var s = http;
    if (options != null) {
        s = https;
        this.options = {
            key: fs.readFileSync(options.key), //'key.pem'
            cert: fs.readFileSync(options.certificate) //'cert.pem'
        };
    }
    this.localPath = path.join(paths.currentApp, "content", localPath);
    this.ip = ip;
    this.port = port;
    this.onRequest = null;
    this.onError = null;
    var This_ = this;
    this.server = s.createServer(function(request, response) {
        if (request.url === "/")
            request.url = "index.html";
        fs.readFile(path.join(This_.localPath, request.url), function(err, data) {
            if (err) {
                response.writeHead(404);
                fs.readFile(path.join(This_.localPath, "error_document.html"), function(error, data) {
                    if (error) {
                        fs.readFile(path.join(paths.core, "local", "error.html"), function(error, data) {
                            if (error) {
                                response.end("An error occurred and we can't find the \"error document\"!\n" + JSON.stringify(err));
                            } else {
                                response.end(data);
                            }
                        });
                    } else {
                        response.end((data == "") ? "The error document is empty!" : data);
                    }
                });
                if (This_.onError != null)
                    This_.onError();
                return;
            }
            response.writeHead(200);
            response.end(data);
            if (This_.onRequest != null)
                This_.onRequest();
        });
    });
    this.server.listen(port, ip);
    this.sockets = new Set();
    this.server.on('connection', (socket) => {
        This_.sockets.add(socket);
        This_.server.once('close', () => {
            This_.sockets.delete(socket);
        });
    });
}
LocalHost.prototype.setPort = function(port) {
    if (this.server == null) {
        console.error("This LocalHost object isn't valid!");
        return false;
    }
    this.port = port;
    this.server.listen(port, this.ip);
};
LocalHost.prototype.setAddress = function(ip) {
    if (this.server == null) {
        console.error("This LocalHost object isn't valid!");
        return false;
    }
    this.ip = ip;
    this.server.listen(this.port, ip);
};
LocalHost.prototype.setLocalPath = function(localPath) {
    if (this.server == null) {
        console.error("This LocalHost object isn't valid!");
        return false;
    }
    this.localPath = path.join(paths.currentApp, "content", localPath);
};
LocalHost.prototype.on = function(event, callback) {
    if (this.server == null) {
        console.error("This LocalHost object isn't valid!");
        return false;
    }
    if (event == "request") {
        this.onRequest = callback;
    } else if (event == "error") {
        this.onError = callback;
    } else {
        console.warn("There is no such event!");
    }
};
LocalHost.prototype.close = function(callback) {
    if (this.server == null) {
        console.error("This LocalHost object isn't valid!");
        return false;
    }
    for (const socket of this.sockets) {
        socket.destroy();
        this.sockets.delete(socket);
    }
    this.server.close(callback);
    this.server = null;
};
const { nativeTheme } = require('electron').remote;
ipcRenderer.on("enderframework--theme-tolight", function() {
    document.documentElement.setAttribute("prefers-color-scheme", "light");
});
ipcRenderer.on("enderframework--theme-todark", function() {
    document.documentElement.setAttribute("prefers-color-scheme", "dark");
});

function Window(id, settings) {
    this.windowID = id;
    this.windowSettings = settings;
    this.creationTime = new Date();
};
const _dialog = require("electron").remote.dialog;
Window.prototype.send = function(channel, data = "") {
    const _channel = channel,
        _data = data,
        ID = this.windowID,
        f = () => {
            if (_data instanceof Window) {
                console.error("Illegal variable!");
            } else {
                ipcRenderer.sendToHost('enderframework--subwindow-sendmessage', {
                    id: ID,
                    channel: _channel,
                    data: (typeof _data == "string") ? `"${_data}"` : ((typeof _data == "number") ? _data : JSON.stringify(_data))
                });
            }
        };
    var nd = new Date(),
        cd = this.creationTime;
    if (this.creationTime == null) {
        f();
    } else if (nd - cd < 1000) {
        setTimeout(function() {
            f();
        }, 1000 - (nd - cd));
    } else {
        this.creationTime = null;
        f();
    }
};
const currentWindow = require("electron").remote.getCurrentWindow();
//
var vm = process.versions;
vm.process = process.version;
vm.framework = require("electron").remote.app.getVersion();
//
//const {c, cpp, node, python, java} = require('compile-run');
//
//
//
module.exports = {
    request: request,
    /*accounts: {
      authenticate: function(){
        //
      },
      getCurrentAccount: function(){
        //
      },
      signIn: function(){
        //
      },
      signUp: function(){
        //
      }
    },
    app: {
      pingToTaskbar: () => {
        //
      },
      pingToDock: () => {
        //
      },
      createShortcut: () => {
        //
      }
    },*/
    os: require("./../../../os"),
    versions: vm,
    /*cast: {
      media: (url) => {
        //
      }
    },*/
    theme: {
        /*color: {
          currentColor: function(){
            //
          },
          setTo: function(){
            //
          }
        },
        acrylic: {
          disable: function(){
            //
          },
          enable: function(){
            //
          }
        },*/
        mode: { //(!) Change the blur color
            isDark: () => {
                return document.documentElement.getAttribute("prefers-color-scheme") == "dark";
            },
            setTo: function(mode) {
                if (mode == "light") {
                    document.documentElement.setAttribute("prefers-color-scheme", "light");
                    ipcRenderer.sendToHost('enderframework--theme-changetolight');
                } else if (mode == "dark") {
                    document.documentElement.setAttribute("prefers-color-scheme", "dark");
                    ipcRenderer.sendToHost('enderframework--theme-changetodark');
                } else if (mode == null) {
                    if (nativeTheme.shouldUseDarkColors) {
                        document.documentElement.setAttribute("prefers-color-scheme", "dark");
                        ipcRenderer.sendToHost('enderframework--theme-changetodark');
                    } else {
                        document.documentElement.setAttribute("prefers-color-scheme", "light");
                        ipcRenderer.sendToHost('enderframework--theme-changetolight');
                    }
                    ipcRenderer.sendToHost('enderframework--theme-changeunlock');
                } else {
                    console.error("There is no such mode!");
                }
            }
        }
    },
    share: (content) => { //Add a function to toggle the "Share UI" and pass the UI
        if (typeof content == "string")
            ipcRenderer.sendToHost('enderframework--share-show', [content]);
        else
            console.error("Only strings are allowed!");
    },
    convert: {
        toLocalFile: directory => {
            return (typeof directory == "string") ? (function() {
                directory = path.join(paths.currentApp, "content", directory);
                if (path.extname(directory) != "")
                    return new LocalFile(directory);
                else
                    console.error("You need to pass a valid path!");
            })() : console.error("The directory must be a string!");
        }
    },
    resources: {
        downloads: {
            getAll: callback => {
                const directoryPath = path.join(paths.currentApp, "resources", "downloads");
                fs.readdir(directoryPath, function(err, files) {
                    if (err) {
                        callback(err, undefined);
                        return console.log('Unable to scan downloads!');
                    }
                    const filesArray = [];
                    files.forEach(function(file) {
                        filesArray[filesArray.length] = new LocalFile(path.join(paths.currentApp, "resources", "downloads", file));
                    });
                    callback(false, filesArray);
                });
            },
            deleteAll: callback => {
                //
            }
        }
    },
    web: {
        open: url => {
            ipcRenderer.sendToHost('do--openawebpage', url);
        },
        download: (url, name) => {
            if (typeof url == "string" && typeof name == "string")
                return new Download(url, name);
            else
                console.error("Only strings are allowed!");
        },
        host: (LocalPath, IP = "localhost", port = 80, options = null) => {
            if (typeof LocalPath == "string") {
                var localhost = new LocalHost(LocalPath, port, IP, options);
            } else
                console.error("You need to pass a valid local path!");
            return localhost;
        }
    },
    wait: {
        elements: (callback) => {
                if (areCustomElementsLoaded) {
                    callback();
                    return true;
                }
                const waitForCustomElements_ = setInterval(function() {
                    if (areCustomElementsLoaded) {
                        callback();
                        clearInterval(waitForCustomElements_);
                    }
                }, 10);
            }
            /*,
                paths: (callback) => {
                  if(typeof paths != "undefined"){
                    callback();
                    return true;
                  }
                  var waitForPath_ = setInterval(function(){
                    if(typeof paths != "undefined") {
                      clearInterval(waitForPath_);
                      callback();
                    }
                  }, 10);
                }*/
    },
    notification: {
        snack: message => {
            if (typeof message == "string")
                ipcRenderer.sendToHost('do--notify', message);
            else
                console.error("You can only pass strings to this function!");
        },
        toast: (title, message, icon = "0", callback = function() {}) => {
            const cbf = callback,
                ID = Math.round(Math.random() * 100000000000000000000);
            ipcRenderer.sendToHost('enderframework--notification-show', [ID, title, message, icon]);
            ipcRenderer.on("enderframework--notification-e" + ID, function() {
                callback(true, undefined);
            });
            ipcRenderer.on("enderframework--notification-c" + ID, function() {
                callback(false, "clicked");
            });
            ipcRenderer.on("enderframework--notification-d" + ID, function() {
                callback(false, "dismissed");
            });
            ipcRenderer.on("enderframework--notification-t" + ID, function() {
                callback(false, "timeout");
            });
            ipcRenderer.on("enderframework--notification-u" + ID, function() {
                callback(false, "unknown");
            });
        }
    },
    encryption: {
        key: () => {
            return key;
        },
        encrypt: (v, k = null) => {
            return aes256.encrypt((k == null) ? key : k, v);
        },
        decrypt: (v, k = null) => {
            return aes256.decrypt((k == null) ? key : k, v);
        }
    },
    contextMenu: {
        create: (content = [], callback) => {
            var menuID = Math.round(Math.random() * 10000000000000000000000000);
            /*[{
              type: "function",
              functionName: "something",
              title: "option 1"
            }, {
              type: "divider"
            }, {
              type: "link",
              link: "the/path/to/your/file",
              title: "option 3"
            }, {
              type: "action",
              actionName: "[Copy/Paste/Cut/Delete]",
              title: "option 4"
            }, {
              type: "link",
              link: "the/path/to/your/file",
              disabled: true,
              title: "option 4"
            }, {
              type: "divider"
            }, {
              type: "dropdown",
              content: [
                {
                  type: "link",
                  link: "the/path/to/your/file",
                  disabled: true,
                  title: "option 4"
                }, {
                  type: "function",
                  functionName: "something",
                  title: "option 1"
                }
              ],
              title: "option 5"
            }]*/
            //
            /*
            EnderFramework.contextMenu.create([{
              type: "function",
              functionName: "something",
              title: "option 1"
            }, {
              type: "divider"
            }, {
              type: "link",
              link: "the/path/to/your/file",
              title: "option 3"
            }, {
              type: "action",
              actionName: "[copy/paste/cut/delete]",
              title: "option 4"
            }, {
              type: "link",
              link: "the/path/to/your/file",
              disabled: true,
              title: "option 4"
            }, {
              type: "divider"
            }, {
              type: "dropdown",
              content: [
                {
                  type: "link",
                  link: "the/path/to/your/file",
                  disabled: true,
                  title: "option 4"
                }, {
                  type: "dropdown",
                  content: [{
                    type: "link",
                    link: "the/path/to/your/file",
                    disabled: true,
                    title: "option 4"
                  }, {
                    type: "link",
                    link: "the/path/to/your/file",
                    disabled: true,
                    title: "option 4"
                  }],
                  title: "An option"
                }, {
                  type: "function",
                  functionName: "something",
                  title: "option 1"
                }
              ],
              title: "option 5"
            }], function(error, menu){
              console.log(error);
              console.log(menu.attachTo(document.documentElement, true));
            });
            */
            (function() {
                const _menuID = menuID;
                ipcRenderer.sendToHost('enderframework--contextmenu-create', [_menuID, content]);
                ipcRenderer.on("enderframework--contextmenu-createdone", function() {
                    if (!menus[_menuID]) {
                        menus[_menuID] = true;
                        //console.log(_menuID);
                        //var menu = new ContextMenu(_menuID);
                        //console.log(menu);
                        callback(false, new ContextMenu(_menuID));
                    }
                });
                ipcRenderer.on("enderframework--contextmenu-createfailed", function() {
                    if (!menus[_menuID]) {
                        menus[_menuID] = true;
                        callback(true, null);
                    }
                });
            })();
            //Create a context menu (It should return an ID for the context menu)
        },
        remove: (menuID) => {
            //Remove a context menu
            (function() {
                const _menuID = menuID;
                ipcRenderer.sendToHost('enderframework--contextmenu-remove', _menuID);
                ipcRenderer.on("enderframework--contextmenu-removereply", function(e) {
                    callback(e.args[0]);
                });
            })();
        },
        show: (menuID, position) => {
            showAMenu(menuID, position);
        },
        hideAll: () => {
            ipcRenderer.sendToHost('enderframework--contextmenu-hideall');
        }
    },
    window: {
        webContents: {
            redirect: url => {
                ipcRenderer.sendToHost('enderframework--theme-coverpage');
                location.href = url;
            },
            reload: () => {
                ipcRenderer.sendToHost('enderframework--theme-coverpage');
                location.reload();
            },
            insertCSS: (content) => {
                ENDERFRAMEWORK_ENVIRONMENT.tell.fire("customelements--insertcss", content);
            },
            executeJavaScript: (content) => {
                ENDERFRAMEWORK_ENVIRONMENT.tell.fire("customelements--insertjs", content);
            }
        },
        setBackgroundColor: function(color) {
            if ((typeof color == "string" && color.length == 6) || color == null)
                ipcRenderer.sendToHost('enderframework--windowblur-setcolor', color);
            else
                console.error("You can only use hex colors!");
        },
        flash: function(shouldEnable) {
            currentWindow.flashFrame(shouldEnable);
        },
        on: function(event, callback) {
            if (event == "enter-lock-mode") {
                EnderFramework.receiver.on("enter-lock-mode", callback);
            } else if (event == "leave-lock-mode") {
                EnderFramework.receiver.on("leave-lock-mode", callback);
            } else if (event == "cover-status-changed") { //function([isHidden]){}
                EnderFramework.receiver.on("cover-status-changed", callback);
            } else {
                currentWindow.on(event, callback);
            }
        },
        cover: {
            hide: () => {
                ipcRenderer.sendToHost('enderframework--windowcover-hide');
            },
            show: () => {
                    ipcRenderer.sendToHost('enderframework--windowcover-show');
                }
                /*isHidden: () => {
                  //
                }*/
        },
        enterLockMode: () => {
            ipcRenderer.sendToHost('enderframework--lockmode-enter');
        },
        leaveLockMode: () => {
            ipcRenderer.sendToHost('enderframework--lockmode-leave');
        },
        enterFullscreen: () => {
            document.documentElement.requestFullscreen();
        },
        exitFullscreen: () => {
            document.exitFullscreen();
        },
        close: function() {
            ipcRenderer.sendToHost('enderframework--close');
        },
        relaunch: function() {
            ipcRenderer.sendToHost('enderframework--relaunch');
        },
        open: function(v = null) {
            if (v === undefined || v === "")
                v = null;
            if (v == null) {
                ipcRenderer.sendToHost('enderframework--new');
            } else {
                if (v.minWidth === undefined) {
                    v.minWidth = null;
                }
                if (v.minHeight === undefined) {
                    v.minHeight = null;
                }
                if (v.maxWidth === undefined) {
                    v.maxWidth = null;
                }
                if (v.maxHeight === undefined) {
                    v.maxHeight = null;
                }
                if (v.menu === undefined) {
                    v.menu = false;
                }
                if (v.url !== undefined && v.width !== undefined && v.height !== undefined && v.title !== undefined) {
                    windowNum++;
                    var data = [v.url, v.width, v.height, v.title, v.minWidth, v.minHeight, v.maxWidth, v.maxHeight, v.menu],
                        id = windowNum + "-" + Math.round(Math.random() * 100000000000000000000);
                    ipcRenderer.sendToHost('enderframework--new2', { id: id, data: data });
                    return new Window(id, data);
                } else {
                    console.warn("Make sure to include the window's URL, width, height, and title!");
                    return null;
                }
            }
        },
        openInBrowser: function(tS) { //Check the tS variable!
            if (typeof tS == "object")
                ipcRenderer.sendToHost('enderframework--openinbrowser', tS);
            else
                console.error("You must pass a JSON object!");
        },
        menu: {
            hide: function() {
                ipcRenderer.sendToHost('enderframework--menu-hide');
            },
            show: function() {
                ipcRenderer.sendToHost('enderframework--menu-show');
            }
        },
        setTitle: function(v) {
            ipcRenderer.sendToHost('enderframework--title-set', v);
        },
        topBar: {
            setToOverlay: function(bool = true) {
                ipcRenderer.sendToHost(`enderframework--topbar-${(bool) ? "set" : "remove"}overlay`);
            },
            setToNoneDragRegion: function(bool) {
                ipcRenderer.sendToHost(`enderframework--topbar-setto${(bool) ? "none" : ""}drag`);
            },
            setColor: function(color) {
                ipcRenderer.sendToHost('enderframework--menu-color', color);
            },
            title: {
                hide: function() {
                    ipcRenderer.sendToHost('enderframework--title-hide');
                },
                show: function() {
                    ipcRenderer.sendToHost('enderframework--title-show');
                }
            },
            icon: {
                hide: function() {
                    ipcRenderer.sendToHost('enderframework--icon-hide');
                },
                show: function() {
                    ipcRenderer.sendToHost('enderframework--icon-show');
                }
            },
            blur: function() {
                ipcRenderer.sendToHost('enderframework--topbar-blur');
            },
            unblur: function() {
                ipcRenderer.sendToHost('enderframework--topbar-unblur');
            },
            autoblur: function() {
                ipcRenderer.sendToHost('enderframework--topbar-autoblur');
            }
        }
    },
    dialog: {
        messageBox: (options = {}) => {
            var buttons = [],
                title = "",
                message = "",
                detail = "";
            if (options.buttons != undefined) {
                buttons = options.buttons;
            }
            if (options.title != undefined) {
                title = options.title;
            }
            if (options.message != undefined) {
                message = options.message;
            }
            if (options.details != undefined) {
                detail = options.details;
            }
            //
            dialog_(title, message, detail, buttons);
            return ENDERFRAMEWORK_ENVIRONMENT.closeDialogs;
            //
        },
        appInfoScreen: () => {
            ipcRenderer.sendToHost('enderframework--dialog-infoscreen');
        },
        showOpenDialog: (options) => { //https://www.electronjs.org/docs/api/dialog#dialogshowopendialogbrowserwindow-options
            _dialog.showOpenDialog(options);
        },
        showSaveDialog: (options) => { //https://www.electronjs.org/docs/api/dialog#dialogshowsavedialogbrowserwindow-options
            _dialog.showSaveDialog(options);
        },
        showCertificateTrustDialog: (options) => { //https://www.electronjs.org/docs/api/dialog#dialogshowcertificatetrustdialogbrowserwindow-options-macos-windows
            _dialog.showCertificateTrustDialog(options); //Replace this Dialog with a custom one
        }
    },
    process: {
        /*c: c,
        cpp: cpp,
        node: node,
        python: python,
        java: java,*/
        execute: (content = null, exit_callback = function() {}, stdout_callback = function() {}, stderr_callback = function() {}) => {
            if (content == null || content === undefined) {
                console.warn("The content is missing!");
                exit_callback(null);
            } else {
                var past = false;
                if (typeof content == "number") {
                    past = true;
                    content = [content];
                } else if (typeof content == "string")
                    content = [content];
                const path____ = path.join(currentPath, "process", "executables");
                var f = path____;
                for (var i = 0; i < content.length; i++) {
                    (function() {
                        const processCode = (past) ? content[i] : Math.round(Math.random() * 10000000000000000000);
                        const filePath_ = path.join(path____, "executable-" + processCode + ".bat");
                        if (past) {
                            const process = spawn('cmd.exe', ['/c', filePath_]);
                            process.stdout.on('data', function(data) {
                                stdout_callback(data);
                            });
                            process.stderr.on('data', function(data) {
                                stderr_callback(data);
                            });
                            process.on('exit', function(code) {
                                exit_callback(code, processCode);
                            });
                        } else {
                            fs.writeFile(filePath_, "cd \"" + path.join(f, "..", "events") + "\"\n" + content[i], function(error) {
                                if (error) {
                                    console.error(error);
                                } else {
                                    const process = spawn('cmd.exe', ['/c', filePath_]);
                                    process.stdout.on('data', function(data) {
                                        stdout_callback(data);
                                    });
                                    process.stderr.on('data', function(data) {
                                        stderr_callback(data);
                                    });
                                    process.on('exit', function(code) {
                                        exit_callback(code, processCode);
                                        //fs.unlink(filePath_, function(){});
                                    });
                                }
                            });
                        }
                    })();
                }
            }
        },
        clean: {
            executables: function(callback = function() {}) {
                const process = spawn('cmd.exe', ['/c', path.join(currentPath, "process", "clean_executables.bat")]);
                process.on('exit', function(code) {
                    callback(code);
                });
            },
            temporary: function(callback = function() {}) {
                const process = spawn('cmd.exe', ['/c', path.join(currentPath, "process", "clean_temporary.bat")]);
                process.on('exit', function(code) {
                    callback(code);
                });
            },
            all: function(callback = function() {}) {
                const process = spawn('cmd.exe', ['/c', path.join(currentPath, "process", "clean.bat")]);
                process.on('exit', function(code) {
                    callback(code);
                });
            }
        }
    },
    /*extensions: {
      activate: function(){
        //
      },
      deactivate: function(){
        //
      },
      add: function(){
        //
      },
      remove: function(){
        //
      }
    },*/
    confirmBeforeClosing: function(v, message = "Are you sure that you want to close this app?") {
        if (!isOnCloseEnabled) {
            if (v == true) {
                if (!isConfirmBeforeClosingEnabled && !isConfirmBeforeClosingLocked) {
                    isConfirmBeforeClosingEnabled = true;
                    ipcRenderer.sendToHost('enderframework--waitbeforeclosing');
                    ipcRenderer.on("enderframework--willclose", function(e) {
                        EnderFramework.dialog.messageBox({
                            title: "Warning!",
                            message: message,
                            buttons: [{
                                text: "No"
                            }, {
                                text: "Yes",
                                type: "primary",
                                onclick: function() {
                                    ENDERFRAMEWORK_ENVIRONMENT.closingEvent.done();
                                }
                            }]
                        });
                        /*alert("Warning!", message, "No", "Yes", function(){
                          //Nothing!
                        }, function(){
                          ipcRenderer.sendToHost('enderframework--waitbeforeclosing-done');
                        });*/
                    });
                } else {
                    if (isConfirmBeforeClosingLocked) {
                        ipcRenderer.sendToHost('enderframework--waitbeforeclosing');
                    }
                    console.warn("The message has already been set!");
                }
            } else if (v == false) {
                if (isConfirmBeforeClosingEnabled)
                    isConfirmBeforeClosingLocked = true;
                isConfirmBeforeClosingEnabled = false;
                ipcRenderer.sendToHost('enderframework--waitbeforeclosing-done2');
            } else {
                console.error("Unexpected input!");
            }
        } else {
            console.warn("You can not use this function when there are other event listeners set for the closing event!");
        }
    },
    on: function(e = "", f = function() {}) {
        if (e == "close") {
            if (!isConfirmBeforeClosingEnabled && !isOnCloseEnabled) {
                isOnCloseEnabled = true;
                (function() {
                    const func = f;
                    ipcRenderer.sendToHost('enderframework--waitbeforeclosing');
                    ipcRenderer.on("enderframework--willclose", function(e) {
                        func();
                        ipcRenderer.sendToHost('enderframework--waitbeforeclosing-done');
                    });
                    //
                })();
            } else {
                console.warn("You can not use this function when there are other event listeners set for the closing event!");
            }
        } else {
            console.error("There is no such event!");
        }
    },
    report: function(message, source, lineNumber, columnNumber, errorObject = null) {
        ipcRenderer.sendToHost('reportingsystem--api', [message, source, lineNumber, columnNumber, errorObject]);
    },
    feedback: function(tS = true) {
        ipcRenderer.sendToHost('enderframework--feedback', tS);
    },
    /*record: {
      voice: function(isText = false, callback){
        /*ipcRenderer.sendToHost('enderframework--record-audio', isText);
        ipcRenderer.on('enderframework--record-audioR', function(e){
          console.log(e);
          console.log(e.arg);
          callback(e.args);
        });*\/
        return false;
      },
      video: function(){
        //
        return false;
      },
      screen: function(callback){
        const recordScreen = require('record-screen'), { screen } = require('electron').remote, { width, height } = screen.getPrimaryDisplay().workAreaSize
        const recording = recordScreen('/tmp/test.mp4', {
          resolution: width + 'x' + height//'1440x900' // Display resolution
        });
        recording.promise.then(result => {
          // Screen recording is done
          callback(false, result);
          //process.stdout.write(result.stdout)
          //process.stderr.write(result.stderr)
        }).catch(error => {
          callback(true, error);
        });
        return recording;
        //setTimeout(() => recording.stop(), 5000)
        //
      }
    },*/
    parse: {
        src: function(root, src, ext) {
            return ENDERFRAMEWORK_ENVIRONMENT.parse.src(root, src, ext);
        },
        code: function(data) {
            return ENDERFRAMEWORK_ENVIRONMENT.parse.code(data);
        }
    },
    receiver: {
        on: function(channel, callback) {
            if (typeof callback != "function") {
                console.error("You must pass a callback function!");
                return false;
            }
            if (global.ENDERFRAMEWORK_ENVIRONMENT.events[channel] == undefined) {
                global.ENDERFRAMEWORK_ENVIRONMENT.events[channel] = [callback];
            } else {
                global.ENDERFRAMEWORK_ENVIRONMENT.events[channel][global.ENDERFRAMEWORK_ENVIRONMENT.events[channel].length] = callback;
            }
        },
        disband: function(channel) {
            if (global.ENDERFRAMEWORK_ENVIRONMENT.events[channel] == undefined) {
                console.error("There is no such event!");
            } else {
                global.ENDERFRAMEWORK_ENVIRONMENT.events[channel] = undefined;
            }
        },
        disable: function() {
            global.ENDERFRAMEWORK_ENVIRONMENT.ReceiverEnabled = false;
        },
        enable: function() {
            global.ENDERFRAMEWORK_ENVIRONMENT.ReceiverEnabled = true;
        }
    }
};
//
document.addEventListener('keydown', function(event) {
    if (event.key == "Escape") {
        ipcRenderer.sendToHost('enderframework--contextmenu-hideall');
    }
});
//
global.chromeAlert = chromeAlert;