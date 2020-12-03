var isLoading = false,
    finishedInsertingResources = function() {
        isLoading = false;
        if (firstLoad) {
            firstLoad = false;
            setTimeout(function() {
                updateTopBarColorOnLoad();
                //window_Cover.style.display = "none";
                //window_LongCover.style.display = "none";
                _content.style.opacity = "1";
                document.hideSplashScreen();
                //_content.style.display = null;
            }, manifest.splashCooldown);
        } else if (manifest.content.redirectAnimations) {
            _content.classList.remove("animated", "fadeInUp2", "fast-ish");
            setTimeout(function() {
                window_Cover.style.display = "none";
                window_LongCover.style.display = "none";
                _content.style.opacity = "1";
                _content.classList.add("animated", "fadeInUp2", "fast-ish");
                setTimeout(function() {
                    _content.classList.remove("animated", "fadeInUp2", "fast-ish");
                }, 280);
            }, 10);
        } else {
            window_Cover.style.display = "none";
            window_LongCover.style.display = "none";
            _content.style.opacity = "1";
        }
    };
_content.setAttribute("webpreferences", `devTools=${(manifest.enable.devTools) ? "yes" : "no"}, nodeIntegration=yes, nodeIntegrationInWorker=yes, nodeIntegrationInSubFrames=yes, sandbox=no, webviewTag=yes, enableRemoteModule=yes, javascript=${(manifest.enable.JavaScript) ? "yes" : "no"}, webSecurity=yes, images=yes, textAreasAreResizable=no, webgl=${(manifest.enable.WebGL) ? "yes" : "no"}, experimentalFeatures=no, scrollBounce=yes, defaultFontFamily="Muli", defaultFontSiz=16, defaultMonospaceFontSize=13, minimumFontSize=0, defaultEncoding="ISO-8859-1", offscreen=no, contextIsolation=no, nativeWindowOpen=no, safeDialogs=no, navigateOnDragDrop=no, autoplayPolicy="no-user-gesture-required" disableHtmlFullscreenWindowResize=no, spellcheck=${(manifest.enable.spellcheck) ? "yes" : "no"}`);
_content.setAttribute("preload", path.join(manifest.paths.core, "framework", "scripts", "content", "preload.js") + "?appPath=" + manifest.paths.currentApp);
_content.addEventListener("dom-ready", function() {
    setTimeout(function() {
        _content.focus();
        if (manifest.enable.devTools)
            _content.openDevTools();
    }, 0);
});
/*_content.addEventListener('did-frame-finish-load', (e) => {
  if(e.isMainFrame){
    window_Cover.style.display = "none";
    window_LongCover.style.display = "none";
    //isLoading = false;
  }
});*/
_content.addEventListener('did-start-loading', function() {
    if (_content.isLoadingMainFrame() & !firstLoad) {
        window_ErrorScreen.style.display = "none";
        window_Cover.style.display = "block";
        _content.style.opacity = "0";
        isLoading = true;
        setTimeout(function() {
            if (isLoading)
                window_LongCover.style.display = "block";
        }, 800);
    }
});
_content.addEventListener("did-fail-load", function(e) {
    if (e.isMainFrame) {
        window_ErrorScreen.style.display = "block";
        window_Cover.style.display = "none";
        window_LongCover.style.display = "none";
        _content.style.opacity = "1";
        isLoading = false;
    } else {
        notify("Some resources failed to load!");
    }
});
_content.addEventListener('crashed', function(e) {
    window_CrashScreen.style.display = "block";
});
_content.addEventListener('new-window', function(e) {
    opn_(e.url);
});
_content.addEventListener('enter-html-full-screen', function() {
    //document.getElementById("_maxWin").style.display = "none";
    Window_TopBar.style.transitionDuration = "0.2s";
    window_FullscreenButton.style.display = "inline-block";
    for (var i = 0; i < HideInFullscreen.length; i++)
        HideInFullscreen[i].classList.add("FSH");
});
_content.addEventListener('leave-html-full-screen', function() {
    //document.getElementById("_maxWin").style.display = "inline-block";
    Window_TopBar.style.transitionDuration = "0s";
    window_FullscreenButton.style.display = "none";
    for (var i = 0; i < HideInFullscreen.length; i++)
        HideInFullscreen[i].classList.remove("FSH");
});