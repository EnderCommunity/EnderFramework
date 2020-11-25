document.addEventListener("DOMContentLoaded", function(event){
  setTimeout(function(){
    //document.getElementById("_cover").style.display = "block";
    var loadingBar = document.getElementById("_webBrowserProgressBar"), content = document.getElementById("_webBrowserWebview"), browserLoop = function(){
      content = document.getElementById("_webBrowserWebview");
      document.getElementById("_MBrowserURL").innerHTML = "Loading...";
      document.getElementsByClassName("WebBrowser--Bar-Back")[0].setAttribute("disabled", "");
      document.getElementsByClassName("WebBrowser--Bar-Forward")[0].setAttribute("disabled", "");
      content.addEventListener("dom-ready", function(){ });
      content.addEventListener("DOM", function(){ });
      //content.setAttribute("preload", "../_manager/_browser_preload.js");
      content.setAttribute("webpreferences", "devTools=no, nodeIntegration=no, nodeIntegrationInWorker=no, nodeIntegrationInSubFrames=no, sandbox=no, enableRemoteModule=no, javascript=yes, webSecurity=yes, allowRunningInsecureContent=no, images=yes, textAreasAreResizable=yes, webgl=yes, experimentalFeatures=no, scrollBounce=no, defaultFontFamily=\"standard\", defaultFontSiz=16, defaultMonospaceFontSize=13, minimumFontSize=0, defaultEncoding=\"ISO-8859-1\", offscreen=no, contextIsolation=no, nativeWindowOpen=no, webviewTag=no, safeDialogs=no, navigateOnDragDrop=no, autoplayPolicy=\"user-gesture-required\" disableHtmlFullscreenWindowResize=no, spellcheck=yes");
      content.setAttribute("enableremotemodule", "false");
      content.addEventListener('load-commit', function (e){
        if(e.isMainFrame){
          var url = e.url;
          if(url.indexOf("?") > -1)
            url = url.substring(0, url.indexOf("?"));
          if(url.indexOf("#") > -1)
            url = url.substring(0, url.indexOf("#"));
          if(url.indexOf("!") > -1)
            url = url.substring(0, url.indexOf("!"));
          if(url.substring(url.length - 1) == "/")
            url = url.substring(0, url.length - 1);
          document.getElementById("_MBrowserURL").innerHTML = url;
          if((e.url).substring(0, 5) !== "https")
            document.getElementById("_MBrowserConnectionStatus").innerHTML = "lock_open";
          else
            document.getElementById("_MBrowserConnectionStatus").innerHTML = "https";
          if(!content.canGoBack())
            document.getElementsByClassName("WebBrowser--Bar-Back")[0].setAttribute("disabled", "");
          else
            document.getElementsByClassName("WebBrowser--Bar-Back")[0].removeAttribute("disabled");
          if(!content.canGoForward())
            document.getElementsByClassName("WebBrowser--Bar-Forward")[0].setAttribute("disabled", "");
          else
            document.getElementsByClassName("WebBrowser--Bar-Forward")[0].removeAttribute("disabled");
        }
      });
      content.addEventListener('did-start-loading', function(){
        if(content.isLoadingMainFrame())
          loadingBar.style.display = "block";
      });
      content.addEventListener('did-frame-finish-load', (e) => {
        if(e.isMainFrame)
          loadingBar.style.display = "none";
      });
      content.addEventListener('new-window', function(e){
        const opn_ = require("opn");
        opn_(e.url);
      });
      content.addEventListener('did-fail-load', function(e){
        document.getElementById("_MBrowserConnectionStatus").innerHTML = "lock_open";
        loadingBar.style.display = "none";
      });
      content.addEventListener('crashed', function(e){
        document.getElementById("_CrashScreen").style.display = "block";
      });
    };
    /*document.getElementById("_MBrowserConnectionStatus").addEventListener("click", function(){
      //
    });*/
    const opn = require('opn');
    document.getElementById("_MBrowserURL").addEventListener("click", function(){
      opn(document.getElementById("_webBrowserWebview").getURL());
    });
    document.getElementsByClassName("WebBrowser--Bar-Refresh")[0].addEventListener("click", function(){
      document.getElementById("_webBrowserWebview").reload();
    });
    document.getElementsByClassName("WebBrowser--Bar-Back")[0].addEventListener("click", function(){
      document.getElementById("_webBrowserWebview").goBack();
    });
    document.getElementsByClassName("WebBrowser--Bar-Forward")[0].addEventListener("click", function(){
      document.getElementById("_webBrowserWebview").goForward();
    });
    document.getElementsByClassName("WebBrowser--Bar-Close")[0].addEventListener("click", function(){
      document.getElementById("_webBrowserC").style.display = "none";
      document.getElementById("_webBrowserWebview").outerHTML = "";
      content = document.createElement("webview");
      content.id = "_webBrowserWebview";
      document.getElementById("_webBrowserC").insertBefore(content, document.getElementById("_webBrowserC").firstChild);
      browserLoop(content);
    });
    browserLoop(content);
  }, 0);
});