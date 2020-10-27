var closeWin_, minWin_, maxWin_;
(function(){
  const remote = electron.remote;
  var window = remote.getCurrentWindow(), isMax = true, showCover = function(c = true){
    var tE = document.getElementById("_transitionCover");
    if(coverOnMax_){
      tE.style.transitionDuration = "0s";
      tE.setAttribute("sShow", "");
    }
    setTimeout(function(){
      if(coverOnMax_ & c){
        tE.removeAttribute("style");
        setTimeout(function(){
          tE.removeAttribute("sShow");
        }, 200);
      }
    }, 50);
  };
  window.on('enter-full-screen', showCover);
  window.on('leave-full-screen', showCover);
  setTimeout(function(){
    window.on('maximize', () => {
      showCover();
      document.documentElement.removeAttribute("window-is-minimized");
      //document.documentElement.removeAttribute("window-is-hidden");
      isMax = true;
    });
    window.on('unmaximize', () => {
      showCover();
      document.documentElement.setAttribute("window-is-minimized", "");
      //document.documentElement.removeAttribute("window-is-hidden");
      isMax = false;
    });
  }, 500);
  window.on('blur', () => {
    document.documentElement.setAttribute("window-is-blurred", "");
  });
  window.on('focus', () => {
    document.documentElement.removeAttribute("window-is-blurred");
  });
  /*window.on('restore', () => {
    document.documentElement.setAttribute("window-is-hidden", "");
    document.documentElement.setAttribute("window-is-minimized", "");
    //alert(1);
  });*/
  closeWin_ = function(){
    if(!_shouldWait){
      window.close();
    }else{
      _content.send("enderframework--willclose");
    }
    loop____ = setInterval(function(){
      if(!_shouldWait){
        clearInterval(loop____);
        window.close();
      }
    }, 5);
  };
  minWin_ = function(){
    window.minimize();
    //document.documentElement.setAttribute("window-is-hidden", "");
  };
  maxWin_ = function(){
    showCover(false);
    setTimeout(function(){
      (isMax) ? (function(){
        window.unmaximize();
      })() : (function(){
        window.maximize();
      })();
    }, 50);
  };
  function init(){
    document.getElementById("_minWin").addEventListener("click", minWin_, true);
    document.getElementById("_maxWin").addEventListener("click", maxWin_, true);
    document.getElementById("_closeWin").addEventListener("click", closeWin_, true);
    document.getElementById("_exitFullscreen").addEventListener("click", function(){
      //document.getElementById("_maxWin").style.display = "block";
      //document.getElementById("_exitFullscreen").style.display = "none";
      _content.executeJavaScript("document.exitFullscreen();");
    }, true);
    document.getElementById("_topBar").style.display = "block";
    //
    /*document.getElementById("_closeWin").onmousedown = function(){
      document.getElementById("_topBarWindowCover").style.display = "block";
    };
    document.getElementById("_maxWin").onmousedown = function(){
      document.getElementById("_topBarWindowCover").style.display = "block";
    };
    document.getElementById("_minWin").onmousedown = function(){
      document.getElementById("_topBarWindowCover").style.display = "block";
    };
    document.onmouseup = function(){
      document.getElementById("_topBarWindowCover").style.display = "none";
    };*/
    //
  }; 
  document.onreadystatechange = function (){
    if(document.readyState == "complete"){
      init(); 
    }
  };
})();