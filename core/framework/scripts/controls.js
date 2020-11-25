(function(){
  var isMax = manifest.window.maximizeOnStart, showCover = function(c = true){
    if(manifest.content.coverOnMaximize){
      Window_TransitionCover.style.transitionDuration = "0s";
      Window_TransitionCover.setAttribute("sShow", "");
    }
    setTimeout(function(){
      if( manifest.content.coverOnMaximize & c){
        Window_TransitionCover.removeAttribute("style");
        setTimeout(function(){
          Window_TransitionCover.removeAttribute("sShow");
        }, 200);
      }
    }, 50);
  };
  currentWindow.on('enter-full-screen', showCover);
  currentWindow.on('leave-full-screen', showCover);
  setTimeout(function(){
    currentWindow.on('maximize', () => {
      showCover();
      document.documentElement.removeAttribute("window-is-minimized");
      isMax = true;
      if(!osInfo.isMacOS){
        window_MaxButton_MaxIcon.style.display = "inline-block";
        window_MaxButton_UnmaxIcon.style.display = "none";
      }
      window_MaxButton.setAttribute("title", "Restore Down");
    });
    currentWindow.on('unmaximize', () => {
      showCover();
      document.documentElement.setAttribute("window-is-minimized", "");
      isMax = false;
      if(!osInfo.isMacOS){
        window_MaxButton_MaxIcon.style.display = "none";
        window_MaxButton_UnmaxIcon.style.display = "inline-block";
      }
      window_MaxButton.setAttribute("title", "Maximize");
    });
    if(!currentWindow.isMaximized()){
      document.documentElement.setAttribute("window-is-minimized", "");
      window_MaxButton_MaxIcon.style.display = "none";
      window_MaxButton_UnmaxIcon.style.display = "inline-block";
    }else{
      window_MaxButton_MaxIcon.style.display = "inline-block";
      window_MaxButton_UnmaxIcon.style.display = "none";
    }
  }, 500);
  currentWindow.on('blur', () => {
    document.documentElement.setAttribute("window-is-blurred", "");
  });
  currentWindow.on('focus', () => {
    document.documentElement.removeAttribute("window-is-blurred");
  });
  closeWin_ = function(){
    if(!_shouldWait){
      currentWindow.close();
    }else{
      _content.send("enderframework--willclose");
    }
    loop____ = setInterval(function(){
      if(!_shouldWait){
        clearInterval(loop____);
        currentWindow.close();
      }
    }, 5);
  };
  minWin_ = function(){
    currentWindow.minimize();
  };
  maxWin_ = function(){
    showCover(false);
    setTimeout(function(){
      (isMax) ? (function(){
        currentWindow.unmaximize();
      })() : (function(){
        currentWindow.maximize();
      })();
    }, 50);
  };
  function init(){
    window_MinButton.addEventListener("click", minWin_, true);
    window_MaxButton.addEventListener("click", maxWin_, true);
    window_CloseButton.addEventListener("click", closeWin_, true);
    window_FullscreenButton.addEventListener("click", function(){
      _content.executeJavaScript("document.exitFullscreen();");
    }, true);
    Window_TopBar.style.display = "block";
  }; 
  document.onreadystatechange = function (){
    if(document.readyState == "complete"){
      init(); 
    }
  };
})();