const { remote, ipcRenderer } = require("electron");
global._content = undefined;
global.isDOMContentReady = false;
global.currentWindow = remote.getCurrentWindow();
global.windowIsReady = function(){
  if(manifest.window.maximizeOnStart && !isSub)
    global.currentWindow.maximize();
  currentWindow.show();
  currentWindow.focus();
};
document.addEventListener("DOMContentLoaded", function(){
  isDOMContentReady = true;
});
global.path = require("path");
global.manifest = ipcRenderer.sendSync('data', "");
global.isSub = window.location.search.indexOf("?subwindow") == 0;
global.subInfo = {
  url: null,
  width: null,
  height: null,
  title: "loading"
};
var messageDone = false;
window.addEventListener("message", function(e){
  if(!messageDone){
    messageDone = true;
    isSub = true;
    subInfo.url = e.data.url;
    subInfo.width = e.data.width;
    subInfo.height = e.data.height;
    subInfo.title = e.data.title;
    subInfo.minWidth = e.data.minWidth;
    subInfo.minHeight = e.data.minHeight;
    subInfo.maxWidth = e.data.maxWidth;
    subInfo.maxHeight = e.data.maxHeight;
    subInfo.menu = e.data.menu;
    currentWindow.setResizable(true);
    currentWindow.setMaximizable(false);
    currentWindow.setMinimizable(false);
    if(subInfo.minWidth !== null && subInfo.minHeight !== null)
      currentWindow.setMinimumSize(subInfo.minWidth, subInfo.minHeight);
    if(subInfo.maxWidth !== null && subInfo.maxHeight !== null)
      currentWindow.setMaximumSize(subInfo.maxWidth, subInfo.maxHeight);
    currentWindow.setSize(subInfo.width, subInfo.height);
  }
}, false);
if(isSub){
  window.addEventListener("message", function(e){
    if(e.data.channel != undefined){
      var f_1 = function(){
        console.log(e.data);
        _content.executeJavaScript("ENDERFRAMEWORK_ENVIRONMENT.EventReceiver(\"" + e.data.channel + "\", " + e.data.data.toString() + ")");
      };
      if(isDOMContentReady & typeof _content == "object" && _content != null){
        f_1();
      }else{
        var loop = setInterval(function(){
          if(isDOMContentReady & typeof _content == "object" && _content != null){
            clearInterval(loop);
            setTimeout(function(){
              f_1();
            }, 0);
          }
        }, 10);
      }
    }
  });
}
if(isSub){
  setTimeout(function () {
    var title = document.getElementById("_title");
    title.innerHTML = title.innerHTML + " | " + subInfo.title;
    //document.getElementById("__longLoading").style.display = "none";
  }, 0);
  if(!global.subInfo.menu){
    var toHide = document.getElementsByName("_menus");
    for(var i = 0; i < toHide.length; i++){
      toHide[i].setAttribute("style", "display: none;");
    }
    setTimeout(function(){
      document.getElementById("_topBar").classList.remove("withTopMenu", "withSideMenu");
      document.getElementById("global._contentView").classList.remove("withTopMenu", "withSideMenu");
    }, 0);
  }
}
const nativeImage = require("electron").remote.nativeImage;
global.TopFramework = {
  setTitle: function(title){
    document.title = title;
    document.getElementById("_title").innerHTML = title;
  },
  setIcon: function(path_, w){
    if(path_.substring(path_.length - 3) == "png"){
      document.getElementById("_icon").setAttribute("src", global.path.join(global.manifest.paths.currentApp, "resources", "icons", path_));
      if(w)
        document.getElementById("_icon").style.display = "inline-block";
      try{
        document.getElementById("_icon").setAttribute("href", global.path.join(global.manifest.paths.currentApp, "resources", "icons", path_));
        global.currentWindow.setIcon(nativeImage.createFromPath(global.path.join(global.manifest.paths.currentApp, "resources", "icons", path_)));
      }catch{
        console.error("The icon isn't valid!");
      }
    }else{
      console.warn("The icon format must be PNG!");
    }
  },
  splashText: function(title){
    document.getElementById("_splashText").innerHTML = title;
  }
};