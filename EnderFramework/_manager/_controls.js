var closeWin_, minWin_, maxWin_;
(function () {
  const remote = electron.remote;
  var window = remote.getCurrentWindow(), isMax = true;
  window.on('maximize', () => {
    isMax = true;
  });
  window.on('unmaximize', () => {
    isMax = false;
  });
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
  };
  maxWin_ = function(){
    (isMax) ? (function(){
      document.documentElement.setAttribute("window-is-minimized", "");
      window.unmaximize();
    })() : (function(){
      document.documentElement.removeAttribute("window-is-minimized");
      window.maximize();
    })();
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