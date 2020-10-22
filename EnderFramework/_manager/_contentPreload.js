if(location.protocol == "file:"){
  var windowNum = 0;
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
  //global.isFrameworkReady = null;
  global.areCustomElementsLoaded = null;
  //global.waitForFramework = 
  //global.waitForCustomElements = ;
  global._checkFunction1 = function(){
    return true;
  };
  const { ipcRenderer } = require('electron');
  global.loadedImages = 0;
  global.allImages = 0;
  //
  const dialog_ = function(t, m, d, b){
    for(var i = 0; i < b.length; i++)
      if(typeof b[i].onclick == "function")
        b[i].onclick = b[i].onclick.toString();
    ipcRenderer.sendToHost('enderframework--dialogs-messagebox', [t, m, d, b]);
  };
  const chromeAlert = alert;
  global.alert = function(t = null, m = null, callback = function(){}){
    if(m == null){
      m = t;
      t = "This page says";
    }
    dialog_(t, m, "", [{
      text: "Ok",
      onclick: callback,
      type: "primary"
    }]);
  };
  //
  document.addEventListener("DOMContentLoaded", function(event){
    /*
    var scrollbars = require(path.join(__dirname, "_bars.js"));
    scrollbars.page();
    */
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
            EnderFramework.dialog.messageBox({
              title: "Warning",
              message: settings.message,
              buttons: [{
                text: "cancel",
                onclick: function(){
                  eval("(" + settings.ondisagree + ")();");
                }
              }, {
                text: "ok",
                type: "warn",
                onclick: function(){
                  eval("(" + settings.onagree + ")();");
                }
              }],
              details: ""
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
      }/*else if(request == "customFunctions"){
        ipcRenderer.sendToHost('get--customfunctions');
        //global.isFrameworkReady = false;
      }*/else if(request == "scrollAnimation"){
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
      /*global.ContextMenuFunction_Copy = function(){ document.execCommand('copy'); };
      global.ContextMenuFunction_Paste = function(){ document.execCommand("paste") };
      global.ContextMenuFunction_Cut = function(){ document.execCommand("cut"); };
      global.ContextMenuFunction_Delete = function(){ ContextMenuElement_.value = ''; };*/
    }
    for(var i = 0; i < Inputs.length; i++){
      var v = Inputs[i].getAttribute("type");
      if(v == null || v ==  "text" || v ==  "email" || v ==  "number" || v ==  "search" || v ==  "tel" || v ==  "url"){
        Inputs[i].addEventListener('contextmenu', e => {
          ContextMenuElement_ = e.target;
          ipcRenderer.sendToHost('enderframework--contextmenu-defaults', {
            X: e.clientX,
            Y: e.clientY,
            type: "input"
          });
        });
      }else if(Inputs[i].getAttribute("type") == "password"){
        Inputs[i].addEventListener('contextmenu', e => {
          ContextMenuElement_ = e.target;
          ipcRenderer.sendToHost('enderframework--contextmenu-defaults', {
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
  const path = require("path");
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
  const request = require('request') ,fs = require("fs");
  function Download(url, name){
    this.name = name;
    //this.targetPath = path_ + "downloads\\" + Math.round(Math.random()*10000000000) + "-" + this.name;
    this.targetPath = path_ + "downloads\\" + this.name;
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
    this.request.on('response', function(data){
      _this.total_bytes = parseInt(data.headers['content-length']);
    });
  }
  Download.prototype.done = function(callback){
    var p = this.targetPath;
    this.request.on('end', function(){
      callback(new LocalFile(p));
    });
  }
  Download.prototype.track = function(callback){
    var _this = this;
    this.request.on('data', function(chunk){
      _this.received_bytes += chunk.length;
      callback(_this.total_bytes, _this.received_bytes);
    });
  };
  function LocalFile(dir){
    this.path = dir;
    this.name = path.basename(dir);
    this.extension = path.extname(dir);
  }
  LocalFile.prototype.delete = function(){
    if(this.path == null)
      return (function(){
        console.error("This LocalFile object isn't valid!");
        return false;
      })();
    fs.unlinkSync(this.path);
    this.path = null;
    return true;
  }
  LocalFile.prototype.getContent = function(callback){
    fs.readFile(this.path, function(err, data){
      callback(err, data);
    });
  }
  var https = require("https"), http = require("http");
  function LocalHost(localPath, port, ip, options){
    var s = http;
    if(options != null){
      s = https;
      this.options = {
        key: fs.readFileSync(options.key),//'key.pem'
        cert: fs.readFileSync(options.certificate)//'cert.pem'
      };
    }
    this.localPath = path.join(path_, "content", localPath);
    this.ip = ip;
    this.port = port;
    this.onRequest = null;
    this.onError = null;
    var This_ = this;
    this.server = s.createServer(function(request, response){
      if(request.url === "/")
        request.url = "index.html";
      fs.readFile(path.join(This_.localPath, request.url), function (err,data){
        if(err){
          response.writeHead(404);
          fs.readFile(path.join(This_.localPath, "error_document.html"), function(error, data){
            if(error){
              fs.readFile(path_.substring(0, path_.indexOf("\\EnderServices\\Apps\\") + "\\EnderServices\\".length) + "\\Local\\error.html", function(error, data){
                if(error){
                  response.end("An error occurred and we can't find the \"error document\"!\n" + JSON.stringify(err));
                }else{
                  response.end(data);
                }
              });
            }else{
              response.end((data == "") ? "The error document is empty!" : data);
            }
          });
          if(This_.onError != null)
            This_.onError();
          return;
        }
        response.writeHead(200);
        response.end(data);
        if(This_.onRequest != null)
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
  LocalHost.prototype.setPort = function(port){
    if(this.server == null){
      console.error("This LocalHost object isn't valid!");
      return false;
    }
    this.port = port;
    this.server.listen(port, this.ip);
  };
  LocalHost.prototype.setAddress = function(ip){
    if(this.server == null){
      console.error("This LocalHost object isn't valid!");
      return false;
    }
    this.ip = ip;
    this.server.listen(this.port, ip);
  };
  LocalHost.prototype.setLocalPath = function(localPath){
    if(this.server == null){
      console.error("This LocalHost object isn't valid!");
      return false;
    }
    this.localPath = path.join(path_, "content", localPath);
  };
  LocalHost.prototype.on = function(event, callback){
    if(this.server == null){
      console.error("This LocalHost object isn't valid!");
      return false;
    }
    if(event == "request"){
      this.onRequest = callback;
    }else if(event == "error"){
      this.onError = callback;
    }else{
      console.warn("There is no such event!");
    }
  };
  LocalHost.prototype.close = function(callback){
    if(this.server == null){
      console.error("This LocalHost object isn't valid!");
      return false;
    }
    for(const socket of this.sockets){
      socket.destroy();
      this.sockets.delete(socket);
    }
    this.server.close(callback);
    this.server = null;
  };
  const { nativeTheme } = require('electron').remote;
  ipcRenderer.on("enderframework--theme-tolight", function(){
    document.documentElement.setAttribute("prefers-color-scheme", "light");
  });
  ipcRenderer.on("enderframework--theme-todark", function(){
    document.documentElement.setAttribute("prefers-color-scheme", "dark");
  });
  function Window(id, settings){
    this.windowID = id;
    this.windowSettings = settings;
    this.creationTime = new Date();
  };
  const _dialog = require("electron").remote.dialog;
  Window.prototype.send = function(channel, data = ""){
    const _channel = channel, _data = data, ID = this.windowID, f = () => {
      if(_data instanceof Window){
        console.error("Illegal variable!");
      }else{
        ipcRenderer.sendToHost('enderframework--subwindow-sendmessage', {
          id: ID,
          channel: _channel,
          data: (typeof _data == "string") ? `"${_data}"` : ((typeof _data == "number") ? _data : JSON.stringify(_data))
        });
      }
    };
    var nd = new Date(), cd = this.creationTime;
    if(this.creationTime == null){
      f();
    }else if(nd - cd < 1000){
      setTimeout(function(){
        f();
      }, 1000 - (nd - cd));
    }else{
      this.creationTime = null;
      f();
    }
  };
  //
  var vm = process.versions;
  vm.process = process.version;
  vm.framework = require("electron").remote.app.getVersion();
  //
  //
  global.EnderFramework = {
    versions: vm,
    page: {
      redirect: url => {
        ipcRenderer.sendToHost('enderframework--theme-coverpage');
        location.href = url;
      },
      reload: () => {
        ipcRenderer.sendToHost('enderframework--theme-coverpage');
        location.reload();
      }
      //
      //_content.loadURL(appPath + "content/" + this.url);
      //document.getElementById("_cover").style.display = "block";
      //
    },
    /*cast: {
      media: (url) => {
        //
      }
    },*/
    theme: {
      mode: {//(!) Change the blur color
        isDark: () => {
          return document.documentElement.getAttribute("prefers-color-scheme") == "dark";
        },
        setTo: function(mode){
          if(mode == "light"){
            document.documentElement.setAttribute("prefers-color-scheme", "light");
            ipcRenderer.sendToHost('enderframework--theme-changetolight');
          }else if(mode == "dark"){
            document.documentElement.setAttribute("prefers-color-scheme", "dark");
            ipcRenderer.sendToHost('enderframework--theme-changetodark');
          }else if(mode == null){
            if(nativeTheme.shouldUseDarkColors){
              document.documentElement.setAttribute("prefers-color-scheme", "dark");
              ipcRenderer.sendToHost('enderframework--theme-changetodark');
            }else{
              document.documentElement.setAttribute("prefers-color-scheme", "light");
              ipcRenderer.sendToHost('enderframework--theme-changetolight');
            }
            ipcRenderer.sendToHost('enderframework--theme-changeunlock');
          }else{
            console.error("There is no such mode!");
          }
        }
      }
    },
    share: (content) => {//Add a function to toggle the "Share UI" and pass the UI
      if(typeof content == "string")
        ipcRenderer.sendToHost('enderframework--share-show', [content]);
      else
        console.error("Only strings are allowed!");
    },
    convert: {
      toLocalFile: directory => {
        return (typeof directory == "string") ? (function(){
          directory = path.join(path_ + "\\content", directory);
          if(path.extname(directory) != "")
            return new LocalFile(directory);
          else
            console.error("You need to pass a valid path!");
        })() : console.error("The directory must be a string!");
      }
    },
    resources: {
      downloads: {
        getAll: callback => {
          const directoryPath = path.join(path_, "downloads");
          fs.readdir(directoryPath, function(err, files){
            if(err){
              callback(err, undefined);
              return console.log('Unable to scan downloads!');
            }
            const filesArray = [];
            files.forEach(function(file){
              filesArray[filesArray.length] = new LocalFile(path.join(path_, file));
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
        if(typeof url == "string" && typeof name == "string")
          return new Download(url, name);
        else
          console.error("Only strings are allowed!");
      },
      host: (LocalPath, IP = "localhost", port = 80, options = null) => {
        if(typeof LocalPath == "string"){
          var localhost = new LocalHost(LocalPath, port, IP, options);
        }else
          console.error("You need to pass a valid local path!");
        return localhost;
      }
    },
    wait: {
      elements: (callback) => {
        if(areCustomElementsLoaded){
          callback();
          return true;
        }
        const waitForCustomElements_ = setInterval(function(){
          if(areCustomElementsLoaded){
            callback();
            clearInterval(waitForCustomElements_);
          }
        }, 10);
      },
      path: (callback) => {
        if(path_ != null){
          callback();
          return true;
        }
        var waitForPath_ = setInterval(function(){
          if(path_ != null){
            callback();
            clearInterval(waitForPath_);
          }
        }, 10);
      }
    },
    notification: {
      snack: message => {
        if(typeof message == "string")
          ipcRenderer.sendToHost('do--notify', message);
        else
          console.error("You can only pass strings to this function!");
      },
      toast: (title, message, icon = "0", callback = function(){}) => {
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
        (function(){
          const _menuID = menuID;
          ipcRenderer.sendToHost('enderframework--contextmenu-create', [_menuID, content]);
          ipcRenderer.on("enderframework--contextmenu-createdone", function(){
            if(!menus[_menuID]){
              menus[_menuID] = true;
              //console.log(_menuID);
              //var menu = new ContextMenu(_menuID);
              //console.log(menu);
              callback(false, new ContextMenu(_menuID));
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
      close: function(){
        ipcRenderer.sendToHost('enderframework--close');
      },
      relaunch: function(){
        ipcRenderer.sendToHost('enderframework--relaunch');
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
          if(v.menu === undefined){
            v.menu = false;
          }
          if(v.url !== undefined && v.width !== undefined && v.height !== undefined && v.title !== undefined){
            windowNum++;
            var data = [v.url, v.width, v.height, v.title, v.minWidth, v.minHeight, v.maxWidth, v.maxHeight, v.menu], id = windowNum + "-" + Math.round(Math.random()*100000000000000000000);
            ipcRenderer.sendToHost('enderframework--new2', {id: id, data: data});
            return new Window(id, data);
          }else{
            console.warn("Make sure to include the window's URL, width, height, and title!");
            return null;
          }
        }
      },
      openInBrowser: function(tS){//Check the tS variable!
        if(typeof tS == "object")
          ipcRenderer.sendToHost('enderframework--openinbrowser', tS);
        else
          console.error("You must pass a JSON object!");
      },
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
      }
    },
    dialog: {
      messageBox: (options = {}) => {
        var buttons = [], title = "", message = "", detail = "";
        if(options.buttons != undefined){
          buttons = options.buttons;
        }
        if(options.title != undefined){
          title = options.title;
        }
        if(options.message != undefined){
          message = options.message;
        }
        if(options.details != undefined){
          detail = options.details;
        }
        //
        dialog_(title, message, detail, buttons);
        //
      },
      appInfoScreen: () => {
        ipcRenderer.sendToHost('enderframework--dialog-infoscreen');
      },
      showOpenDialog: (options) => {//https://www.electronjs.org/docs/api/dialog#dialogshowopendialogbrowserwindow-options
        _dialog.showOpenDialog(options);
      },
      showSaveDialog: (options) => {//https://www.electronjs.org/docs/api/dialog#dialogshowsavedialogbrowserwindow-options
        _dialog.showSaveDialog(options);
      },
      showCertificateTrustDialog: (options) => {//https://www.electronjs.org/docs/api/dialog#dialogshowcertificatetrustdialogbrowserwindow-options-macos-windows
        _dialog.showCertificateTrustDialog(options);//Replace this Dialog with a custom one
      }
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
    report: function(message, source, lineNumber, columnNumber, errorObject = null){
      ipcRenderer.sendToHost('reportingsystem--api', [message, source, lineNumber, columnNumber, errorObject]);
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
    },
    receiver: {
      on: function(channel, callback){
        if(typeof callback != "function"){
          console.error("You must pass a callback function!");
          return false;
        }
        if(global.ENDERFRAMEWORK_ENVIRONMENT.events[channel] == undefined){
          global.ENDERFRAMEWORK_ENVIRONMENT.events[channel] = [callback];
        }else{
          global.ENDERFRAMEWORK_ENVIRONMENT.events[channel][global.ENDERFRAMEWORK_ENVIRONMENT.events[channel].length] = callback;
        }
      },
      disband: function(channel){
        if(global.ENDERFRAMEWORK_ENVIRONMENT.events[channel] == undefined){
          console.error("There is no such event!");
        }else{
          global.ENDERFRAMEWORK_ENVIRONMENT.events[channel] = undefined;
        }
      },
      disable: function(){
        global.ENDERFRAMEWORK_ENVIRONMENT.ReceiverEnabled = false;
      },
      enable: function(){
        global.ENDERFRAMEWORK_ENVIRONMENT.ReceiverEnabled = true;
      }
    }
  };
  //
  document.addEventListener('keydown', function(event){
    if(event.key == "Escape"){
      ipcRenderer.sendToHost('enderframework--contextmenu-hideall');
    }
  });
  //
  //The ENVIRONMENT object
  global.ENDERFRAMEWORK_ENVIRONMENT = {
    original:{
      alert: chromeAlert
    },
    ReceiverEnabled: true,
    events: {},
    EventReceiver: function(channel, data){
      if(this.ReceiverEnabled){
        if(this.events[channel] != undefined){
          for(var i = 0; i < this.events[channel].length; i++){
            this.events[channel][i](data);
          }
        }
      }
    },
    actions: {
      Copy: function(){
        document.execCommand('copy');
      },
      Paste: function(){
        document.execCommand("paste")
      },
      Cut: function(){
        document.execCommand("cut");
      },
      Delete: function(){
        ContextMenuElement_.value = '';
      }
      /*
      global.ContextMenuFunction_Copy
      ENDERFRAMEWORK_ENVIRONMENT.actions.
      global.ContextMenuFunction_Paste
      global.ContextMenuFunction_Cut
      global.ContextMenuFunction_Delete*/
    }
  };
  //
  window.onerror = function(message, source, lineno, colno, error){
    ipcRenderer.sendToHost('reportingsystem--window', [message, source, lineno, colno, error]);
  };
  process.on('uncaughtException', function(message, source, lineno, colno, error){
    ipcRenderer.sendToHost('reportingsystem--process', [message, source, lineno, colno, error]);
  });
  //
}else{
  console.warn("You can't access any of EnderFramework native functions using the current protocol (`" + location.protocol + "`)!");
}