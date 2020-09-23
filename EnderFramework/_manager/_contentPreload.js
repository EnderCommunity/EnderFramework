const { start } = require('repl');

if(location.protocol == "file:"){
  //
  //const oldRequire = require;
  /*global.require = (v) => {
    if(v.substring(0, 1) != "."){
      //
      oldRequire("./");
    }else{
      return oldRequire(v);
    }
  };*/
  //console.log(module.paths);
  //module.paths = [];
  //modules
  //
  global.path_ = null;
  global.isFrameworkReady = null;
  global.areCustomElementsLoaded = null;
  global.waitForPath = (f = function(){}) => {
    var waitForPath_ = setInterval(function(){
      if(path_ != null){
        f();
        clearInterval(waitForPath_);
      }
    }, 10);
    if(path_ != null){
      f();
      clearInterval(waitForPath_);
    }
  };
  global.waitForFramework = (f = function(){}) => {
    var waitForFramework_ = setInterval(function(){
      if(isFrameworkReady){
        f();
        clearInterval(waitForFramework_);
      }
    }, 10);
    if(isFrameworkReady){
      f();
      clearInterval(waitForFramework_);
    }
  };
  global.waitForCustomElements = (f = function(){}) => {
    var waitForCustomElements_ = setInterval(function(){
      if(areCustomElementsLoaded){
        f();
        clearInterval(waitForCustomElements_);
      }
    }, 10);
    if(areCustomElementsLoaded){
      f();
      clearInterval(waitForCustomElements_);
    }
  };
  global._checkFunction1 = function(){
    return true;
  };
  const { ipcRenderer } = require('electron');
  const chromeAlert = alert;
  global._alert = chromeAlert;
  global.alert = function(){
    console.warn("You need to wait until the page is done loading to use the `alert()` function! You can instead use `_alert()`!");
  };
  global.loadedImages = 0;
  global.allImages = 0;
  document.addEventListener("DOMContentLoaded", function(event){
    (function(){
      var images = document.querySelectorAll("img[src]");
      if(images.length > 0){
        ipcRenderer.sendToHost('event--startLoading');
        var timer = setInterval(function(){
          if(document.readyState === "complete"){
            clearInterval(timer);
            ipcRenderer.sendToHost('event--doneLoading');
          }
        }, 500);
        for(var i = 0; i < images.length; i++){
          images[i].addEventListener("error", function(){
            ipcRenderer.sendToHost('do--notify', "Failed to load all of the images.");
          });
        }
      }
    })();
    //global.alert = function(t, m, bt, pbt, bf = function(){}, pbf = function(){}){
    global.alert = function(t = null, m = null, callback = function(){}){
      setTimeout(function(){
        var main, box, title, message, buttonsC,button, primaryButton;
        document.getElementsByTagName("body")[0].classList.add("noScroll");
        main = document.createElement("div");
        main.classList.add("COfAlert");
        var actionButtons = document.getElementsByTagName("floatingactionbutton");
        for(var i = 0; i < actionButtons.length; i++){
          actionButtons[i].setAttribute("style", "right: 42px; -webkit-transition-duration: 0s; transition-duration: 0s;");
          setTimeout(function(){
            actionButtons[i].setAttribute("style", "right: 42px;");
          }, 100);
        }
        const removeF = function(){
          main.outerHTML = "";
          document.getElementsByTagName("body")[0].classList.remove("noScroll");
          for(var i = 0; i < actionButtons.length; i++){
            actionButtons[i].setAttribute("style", "-webkit-transition-duration: 0s; transition-duration: 0s;");
            setTimeout(function(){
              actionButtons[i].setAttribute("style", "");
            }, 100);
          }
        };
        document.body.appendChild(main);
        box = document.createElement("div");
        box.classList.add("AlertBox", "animated", "pulse", "faster");
        main.appendChild(box);
        title = document.createElement("text");
        title.classList.add("title");
        title.innerHTML = (m == null) ? "This page says" : t;
        box.appendChild(title);
        message = document.createElement("text");
        message.classList.add("message");
        message.innerHTML = (m == null) ? t : m;
        box.appendChild(message);
        buttonsC = document.createElement("div");
        buttonsC.classList.add("COfButton");
        box.appendChild(buttonsC);
        primaryButton = document.createElement("button");
        primaryButton.setAttribute("primary", "");
        primaryButton.innerHTML = "Ok";
        primaryButton.addEventListener("click", function(){
          setTimeout(function(){
            removeF();
            callback();
          }, 160);
        });
        buttonsC.appendChild(primaryButton);
      }, 0);
    };
    /*
        global.alert = function(t, m, bt, pbt, bf = function(){}, pbf = function(){}){
      setTimeout(function(){
        var main, box, title, message, buttonsC,button, primaryButton;
        document.getElementsByTagName("body")[0].classList.add("noScroll");
        main = document.createElement("div");
        main.classList.add("COfAlert");
        var actionButtons = document.getElementsByTagName("floatingactionbutton");
        for(var i = 0; i < actionButtons.length; i++){
          actionButtons[i].setAttribute("style", "right: 42px; -webkit-transition-duration: 0s; transition-duration: 0s;");
          setTimeout(function(){
            actionButtons[i].setAttribute("style", "right: 42px;");
          }, 100);
        }
        const removeF = function(){
          main.outerHTML = "";
          document.getElementsByTagName("body")[0].classList.remove("noScroll");
          for(var i = 0; i < actionButtons.length; i++){
            actionButtons[i].setAttribute("style", "-webkit-transition-duration: 0s; transition-duration: 0s;");
            setTimeout(function(){
              actionButtons[i].setAttribute("style", "");
            }, 100);
          }
        };
        document.body.appendChild(main);
        box = document.createElement("div");
        box.classList.add("AlertBox", "animated", "pulse", "faster");
        main.appendChild(box);
        title = document.createElement("text");
        title.classList.add("title");
        title.innerHTML = t;
        box.appendChild(title);
        message = document.createElement("text");
        message.classList.add("message");
        message.innerHTML = m;
        box.appendChild(message);
        buttonsC = document.createElement("div");
        buttonsC.classList.add("COfButton");
        box.appendChild(buttonsC);
        button = document.createElement("button");
        button.innerHTML = bt;
        button.addEventListener("click", function(){
          setTimeout(function(){
            removeF();
            bf();
          }, 160);
        });
        buttonsC.appendChild(button);
        primaryButton = document.createElement("button");
        primaryButton.setAttribute("primary", "");
        primaryButton.innerHTML = pbt;
        primaryButton.addEventListener("click", function(){
          setTimeout(function(){
            removeF();
            pbf();
          }, 160);
        });
        buttonsC.appendChild(primaryButton);
      }, 0);
    };
    */
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches, isLightMode = window.matchMedia("(prefers-color-scheme: light)").matches, isNotSpecified = window.matchMedia("(prefers-color-scheme: no-preference)").matches, hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified;
    if(isDarkMode)
      document.documentElement.setAttribute('prefers-color-scheme', 'dark');
    else
      document.documentElement.setAttribute('prefers-color-scheme', 'light');
    var buttons = document.getElementsByTagName("button");
    for(var i = 0; i < buttons.length; i++){
      Array.prototype.slice.call(buttons[i].attributes).forEach(function(item){
        if(item.name == "warn"){
          var settings = JSON.parse(item.value);
          buttons[i].addEventListener("click", function(){
            alert("Warning", settings.message, "cancel", "ok", function(){
              eval("(function()" + settings.ondisagree + ")();");
            }, function(){
              eval("(function()" + settings.onagree + ")();");
            });
          });
        }
      });
    }
    var requests = document.getElementsByTagName("request"), isMediaAllowed = false;
    for(var i = 0; i < requests.length; i++){
      var request = requests[i].getAttribute("name");
      if(request == "editingTools"){
        ipcRenderer.sendToHost('get--codebox');
        window.codebox = true;
      }else if(request == "customElements"){
        ipcRenderer.sendToHost('get--customelements');
      }else if(request == "customFunctions"){
        ipcRenderer.sendToHost('get--customfunctions');
        global.isFrameworkReady = false;
      }else if(request == "scrollAnimation"){
        ipcRenderer.sendToHost('get--scrollAnimation');
      }else if(request == "tooltip"){
        ipcRenderer.sendToHost('get--tooltip');
      }else if(request == "media"){
        ipcRenderer.sendToHost('get--media');
        isMediaAllowed = true;
      }else{
        console.warn("Your request, with the name `" + request + "`, can't be found!");
      }
    }
    if(isMediaAllowed == false){
      var c = document.getElementsByTagName("video");
      for(var ix = 0; ix < c.length; ix++)
        c[ix].outerHTML = "";
      v = document.getElementsByTagName("audio");
      for(var ix = 0; ix < c.length; ix++)
        c[ix].outerHTML = "";
    }
    setTimeout(function(){
      var switchEls = document.getElementsByTagName("switch");
      for(var i = 0; i < switchEls.length; i++){
        switchEls[i].addEventListener("click", function(){
          if(this.getAttribute("active") == "false")
          this.setAttribute("active", "true");
          else if(this.getAttribute("active") == "true")
          this.setAttribute("active", "false");
        });
      }
    }, 0);
    var Inputs = document.getElementsByTagName("input");
    if(Inputs.length > 0){
      global.ContextMenuElement_ = undefined;
      global.ContextMenuFunction_Copy = function(){ document.execCommand('copy'); };
      global.ContextMenuFunction_Paste = function(){ document.execCommand("paste") };
      global.ContextMenuFunction_Cut = function(){ document.execCommand("cut"); };
      global.ContextMenuFunction_Delete = function(){ ContextMenuElement_.value = ''; };
    }
    for(var i = 0; i < Inputs.length; i++){
      var v = Inputs[i].getAttribute("type");
      if(v == null || v ==  "text" || v ==  "email" || v ==  "number" || v ==  "search" || v ==  "tel" || v ==  "url"){
        Inputs[i].addEventListener('contextmenu', e => {
          ContextMenuElement_ = e.target;
          ipcRenderer.sendToHost('ContentContextMenu', {
            X: e.clientX,
            Y: e.clientY,
            type: "input"
          });
        });
      }else if(Inputs[i].getAttribute("type") == "password"){
        Inputs[i].addEventListener('contextmenu', e => {
          ContextMenuElement_ = e.target;
          ipcRenderer.sendToHost('ContentContextMenu', {
            X: e.clientX,
            Y: e.clientY,
            type: "password"
          });
        });
      }
    }
    (function(){
      var a = document.getElementsByTagName("a");
      for(var i = 0; i < a.length; i++)
        if(a[i].hasAttribute("href") && a[i].getAttribute("href").substring(0, 4) == "http" && a[i].getAttribute("target") != "_blank"){
          a[i].setAttribute("Xhref", a[i].getAttribute("href"));
          a[i].removeAttribute("href");
          a[i].addEventListener("click", function(){
            ipcRenderer.sendToHost('do--openawebpage', this.getAttribute("Xhref"));
          });
        }
    })();
    /*setTimeout(function(){
      window.scrollTo(0, 0);
    }, 380);*/
  });
  var isOnCloseEnabled = false, isConfirmBeforeClosingEnabled = false, isConfirmBeforeClosingLocked = false, newF = function(){
    return __dirname.replace("EnderFramework\\_manager", `Apps\\process\\${(function(){
      var result = '', characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      for(var i = 0; i < 6; i++)
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      return result;
    })()}-${Math.round(Math.random()*10000000000000000000)}\\`);
  };
  const spawn = require('child_process').spawn, start_process = function(cb = function(){}){
    f = newF();
    var done____ = 0;
    const fs = require("fs"), done = function(t = true){
      if(t)
        done____++;
      else
        cb(false);
      if(done____ >= 3 && t != false){
        cb(true);
      }
    };
    fs.mkdir(f, function(err){
      if(err){
        console.error(err);
        done(false);
      }else{
        done();
        fs.mkdir(f + "executables\\", function(err_){
          if(err_){
            console.error(err_)
            done(false);
          }else{
            done();
            fs.mkdir(f + "events\\", function(err_){
              if(err_){
                console.error(err_);
                done(false);
              }else{
                done();
              }
            });
            fs.writeFile(f + "delete.bat", "rmdir /Q /S \"" + f + "\"", function(error){
              if(error){
                console.warn("You can't use `EnderFramework.process.clean()`!");
              }
            });
          }
        });
      }
    });
  };
  start_process();
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
  var aes256 = require('aes256'), key = (function(){
    var result = '';
    var characters = (function(){
      var s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~`!@#$%^&*()_+-=[]{};:\'",.<>/?\\|';
      var arr = s.split('');
      var n = arr.length;
      for(var i=0 ; i<n-1 ; ++i){
        var j = Math.floor(Math.random()*Math.random()*n);
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
      s = arr.join('');
      return s;
    })();
    var charactersLength = characters.length;
    for(var i = 0; i < 64; i++){
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  })();;
  global.EnderFramework_ContextMenuActions = {
    //
    copy: () => {
      //
    }, paste: () => {
      //
    }, cut: () => {
      //
    }, delete: () => {
      //
    }, devTools: () => {
      //
    }
  };
  //The objects
  function ContextMenu(id){
    this.ID = id;
  }
  ContextMenu.prototype.attachTo = function(element, v = false){
    var menuID = this.ID;
    try{
      element.addEventListener("contextmenu", function(e){
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
    }catch{
      return false;
    }
  };
  //
  global.EnderFramework = {
    notification: {
      snack: message => {
        if(typeof message == "string")
          ipcRenderer.sendToHost('do--notify', message);
        else
          console.error("You can only pass strings to this function!");
      },
      toast: (title, message, icon = undefined, callback) => {
        const cbf = callback, ID = Math.round(Math.random()*100000000000000000000);
        ipcRenderer.sendToHost('enderframework--notification-show', [ID, title, message, icon]);
        ipcRenderer.on("enderframework--notification-e" + ID, function(){
          callback(true, undefined);
        });
        ipcRenderer.on("enderframework--notification-c" + ID, function(){
          callback(false, "clicked");
        });
        ipcRenderer.on("enderframework--notification-d" + ID, function(){
          callback(false, "dismissed");
        });
        ipcRenderer.on("enderframework--notification-t" + ID, function(){
          callback(false, "timeout");
        });
        ipcRenderer.on("enderframework--notification-u" + ID, function(){
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
        var menuID = Math.round(Math.random()*10000000000000000000000000);
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
        (function(){
          const _menuID = menuID;
          ipcRenderer.sendToHost('enderframework--contextmenu-create', [_menuID, content]);
          ipcRenderer.on("enderframework--contextmenu-createdone", function(){
            if(!menus[_menuID]){
              menus[_menuID] = true;
              console.log(_menuID);
              var menu = new ContextMenu(_menuID);
              console.log(menu);
              callback(false, menu);
            }
          });
          ipcRenderer.on("enderframework--contextmenu-createfailed", function(){
            if(!menus[_menuID]){
              menus[_menuID] = true;
              callback(true, null);
            }
          });
        })();
        //Create a context menu (It should return an ID for the context menu)
      },
      remove: (menuID) => {
        //Remove a context menu
        (function(){
          const _menuID = menuID;
          ipcRenderer.sendToHost('enderframework--contextmenu-remove', _menuID);
          ipcRenderer.on("enderframework--contextmenu-removereply", function(e){
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
      enterFullscreen: () => {
        document.documentElement.requestFullscreen();
      },
      exitFullscreen: () => {
        document.exitFullscreen();
      }
    },
    dialog: {
      showMessageBox: (options = {}) => {
        var type = "none", buttons = ["ok"], title = "", message = "", detail = "";
        if(options.type != undefined){
          type = options.type;
        }
        if(options.buttons != undefined){
          buttons = options.buttons;
        }
        if(options.title != undefined){
          title = options.title;
        }
        if(options.message != undefined){
          message = options.message;
        }
        if(options.detail != undefined){
          detail = options.detail;
        }
      },
      showErrorBox: () => {
        //
      }
      /*showOpenDialog: () => {//File explorer
        //
      },
      showSaveDialog: () => {//File explorer
        //
      },
      showCertificateTrustDialog: () => {
        //
      }*/
    },
    process: {
      /*report: function(){
        //With photos
      },
      feedback: function(){
        //With photos
      },*/
      folder: function(){
        return f;
      },
      execute: (content = null, exit_callback = function(){}, stdout_callback = function(){}, stderr_callback = function(){}) => {
        if(content == null || content === undefined){
          console.warn("The content is missing!");
          exit_callback(null);
        }else if(f == null){
          console.error("You need to start a new process!");
          exit_callback(false);
        }else{
          var past = false;
          if(typeof content == "number"){
            past = true;
            content = [content];
          }else if(typeof content == "string")
            content = [content];
          const path____ = f + "executables\\";
          for(var i = 0; i < content.length; i++){
            (function(){
              const processCode = (past) ? content[i] : Math.round(Math.random()*10000000000000000000);
              const filePath_ = path____ + "executable-" + processCode + ".bat";
              if(past){
                const process = spawn('cmd.exe', ['/c', filePath_]);
                process.stdout.on('data', function(data){
                  stdout_callback(data);
                });
                process.stderr.on('data', function(data){
                  stderr_callback(data);
                });
                process.on('exit', function(code){
                  exit_callback(code, processCode);
                });
              }else{
                fs.writeFile(filePath_, "cd \"" + f + "events\\\"\n" + content[i], function(error){
                  if(error){
                    console.error(error);
                  }else{
                    const process = spawn('cmd.exe', ['/c', filePath_]);
                    process.stdout.on('data', function(data){
                      stdout_callback(data);
                    });
                    process.stderr.on('data', function(data){
                      stderr_callback(data);
                    });
                    process.on('exit', function(code){
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
      delete: function(callback = function(){}){
        if(f == null){
          console.error("You need to start a new process!");
          callback(false);
        }else{
          const process = spawn('cmd.exe', ['/c', f + "delete.bat"]);
          process.on('exit', function(code){
            f = null;
            callback(code);
          });
        }
      },
      new: function(callback = function(){}){
        if(f == null){
          start_process(callback);
        }else{
          console.warn("You can only use this function after clearing the current process!");
          callback(null);
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
    confirmBeforeClosing: function(v, message = "Are you sure that you want to close this app?"){
      if(!isOnCloseEnabled){
        if(v == true){
          if(!isConfirmBeforeClosingEnabled && !isConfirmBeforeClosingLocked){
            isConfirmBeforeClosingEnabled = true;
            ipcRenderer.sendToHost('enderframework--waitbeforeclosing');
            ipcRenderer.on("enderframework--willclose", function(e){
              alert("Warning!", message, "No", "Yes", function(){
                //Nothing!
              }, function(){
                ipcRenderer.sendToHost('enderframework--waitbeforeclosing-done');
              });
            });
          }else{
            if(isConfirmBeforeClosingLocked){
              ipcRenderer.sendToHost('enderframework--waitbeforeclosing');
            }
            console.warn("The message has already been set!");
          }
        }else if(v == false){
          if(isConfirmBeforeClosingEnabled)
            isConfirmBeforeClosingLocked = true;
          isConfirmBeforeClosingEnabled = false;
          ipcRenderer.sendToHost('enderframework--waitbeforeclosing-done2');
        }else{
          console.error("Unexpected input!");
        }
      }else{
        console.warn("You can not use this function when there are other event listeners set for the closing event!");
      }
    },
    on: function(e = "", f = function(){}){
      if(e == "close"){
        if(!isConfirmBeforeClosingEnabled && !isOnCloseEnabled){
          isOnCloseEnabled = true;
          (function(){
            const func = f;
            ipcRenderer.sendToHost('enderframework--waitbeforeclosing');
            ipcRenderer.on("enderframework--willclose", function(e){
              func();
              ipcRenderer.sendToHost('enderframework--waitbeforeclosing-done');
            });
            //
          })();
        }else{
          console.warn("You can not use this function when there are other event listeners set for the closing event!");
        }
      }else{
        console.error("There is no such event!");
      }
    },
    open: function(v = null){
      if(v === undefined || v === "")
        v = null;
      if(v == null){
        ipcRenderer.sendToHost('enderframework--new');
      }else{
        if(v.minWidth === undefined){
          v.minWidth = null;
        }
        if(v.minHeight === undefined){
          v.minHeight = null;
        }
        if(v.maxWidth === undefined){
          v.maxWidth = null;
        }
        if(v.maxHeight === undefined){
          v.maxHeight = null;
        }
        if(v.url !== undefined && v.width !== undefined && v.height !== undefined && v.title !== undefined)
          ipcRenderer.sendToHost('enderframework--new2', [ v.url, v.width, v.height, v.title, v.minWidth, v.minHeight, v.maxWidth, v.maxHeight]);
        else
          console.warn("Make sure to include the window's URL, width, height, and title!");
      }
    },
    close: function(){
      ipcRenderer.sendToHost('enderframework--close');
    },
    relaunch: function(){
      ipcRenderer.sendToHost('enderframework--relaunch');
    },
    openInBrowser: function(tS){
      ipcRenderer.sendToHost('enderframework--openinbrowser', tS);
    },
    feedback: function(tS = true){
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
    menu: {
      hide: function(){
        ipcRenderer.sendToHost('enderframework--menu-hide');
      },
      show: function(){
        ipcRenderer.sendToHost('enderframework--menu-show');
      }
    },
    topBar: {
      setColor: function(c){
        ipcRenderer.sendToHost('enderframework--menu-color', c);
      },
      title: {
        hide: function(){
          ipcRenderer.sendToHost('enderframework--title-hide');
        },
        show: function(){
          ipcRenderer.sendToHost('enderframework--title-show');
        },
        set: function(v){
          ipcRenderer.sendToHost('enderframework--title-set', v);
        }
      }
    },
    parse: function(data){
      var result = [], length = data.replace(/[^\n]/g, "").length + 1;
      for(var i = 0; i < length; i++){
        var currentLineData = {}, line = data.substring(0, (data.indexOf("\n") > -1) ? data.indexOf("\n") : data.length).replace(/\s/g, ""), isThereAComment = false, isThereAnAttribute = false, isStrict = false;
        if(line.indexOf("@") == 0){
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
  };
}else{
  console.warn("You can't access any of EnderFramework native functions using the current protocol (`" + location.protocol + "`)!");
}