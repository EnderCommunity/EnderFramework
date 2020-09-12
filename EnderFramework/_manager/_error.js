document.addEventListener("DOMContentLoaded", function(){
  var reloadButton = document.getElementById("_ErrorScreen").getElementsByTagName("button")[0], homeButton = document.getElementById("_ErrorScreen").getElementsByTagName("button")[1], closeButton = document.getElementById("_CrashScreen").getElementsByTagName("button")[0], restartButton = document.getElementById("_CrashScreen").getElementsByTagName("button")[1], app = electron.remote.app;
  reloadButton.addEventListener("click", function(){
    _content.reload();
    document.getElementById("_ErrorScreen").style.display = "none";
    document.getElementById("_cover").style.display = "block";
  });
  homeButton.addEventListener("click", function(){
    _content.loadURL(appPath + "content\\_main.html");
    if(!isSub){
      _content.loadURL(appPath + "content\\_main.html");
    }else{
      _content.loadURL(appPath + "content\\" + subInfo.url);
    }
    document.getElementById("_ErrorScreen").style.display = "none";
    document.getElementById("_cover").style.display = "block";
  });
  closeButton.addEventListener("click", function(){
    closeWin_();
  });
  restartButton.addEventListener("click", function(){
    app.relaunch();
    app.quit();
  });
});