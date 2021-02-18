(function() {
    if (!manifest.window.isClosable)
        window_CloseButton.setAttribute("disabled", "");
    if (!manifest.window.isMinimizable)
        window_MinButton.setAttribute("disabled", "");
    if (!manifest.window.isMaximizable)
        window_MaxButton.setAttribute("disabled", "");
    //"isFullscreenable": true,
    //"resizable": true

    var isMax = manifest.window.maximizeOnStart,
        showCover = function(c = true) {
            if (manifest.content.coverOnMaximize) {
                Window_TransitionCover.style.transitionDuration = "0s";
                Window_TransitionCover.setAttribute("sShow", "");
            }
            setTimeout(function() {
                if (manifest.content.coverOnMaximize & c) {
                    Window_TransitionCover.removeAttribute("style");
                    setTimeout(function() {
                        Window_TransitionCover.removeAttribute("sShow");
                    }, 200);
                }
            }, 50);
        },
        _showCover = function(c = true) {
            Window_TransitionCover2.style.transitionDuration = "0s";
            Window_TransitionCover2.setAttribute("sShow", "");
            document.documentElement.classList.add("_hideBorder");
            setTimeout(function() {
                if (!c) {
                    Window_TransitionCover2.removeAttribute("style");
                    Window_TransitionCover2.removeAttribute("sShow");
                    document.documentElement.classList.remove("_hideBorder");
                }
            }, 10);
        };
    currentWindow.on('enter-full-screen', showCover);
    currentWindow.on('leave-full-screen', showCover);
    var isFalseAlarm = false,
        isResizeDone = true;
    if (manifest.content.coverOnResize) {
        if (osInfo.isWindows || osInfo.isMacOS) {
            currentWindow.on('will-resize', function() {
                if (!isFalseAlarm) {
                    isResizeDone = false;
                    _showCover();
                } else
                    isFalseAlarm = false;
            });
            currentWindow.on('resized', function() {
                if (!isResizeDone) {
                    isResizeDone = true;
                    _showCover(false);
                }
            });
        } else {
            var isResizing = false,
                //isDoneLock = false,
                isFinished = function() {
                    isResizing = false;
                    setTimeout(function() {
                        if (!isResizing) {
                            //isDoneLock = true;
                            _showCover(false);
                            /*setTimeout(function() {
                                isDoneLock = false;
                            }, 1000);*/
                        }
                    }, 1);
                };
            currentWindow.on('resize', function() {
                if (!isFalseAlarm) {
                    if (!isResizing) {
                        isResizing = true;
                        _showCover();
                        isFinished();
                    }
                } else
                    isFalseAlarm = false;
            });
        }
    }
    setTimeout(function() {
        currentWindow.on('maximize', () => {
            isFalseAlarm = true;
            showCover();
            document.documentElement.removeAttribute("window-is-minimized");
            isMax = true;
            if (!osInfo.isMacOS) {
                window_MaxButton_MaxIcon.style.display = "inline-block";
                window_MaxButton_UnmaxIcon.style.display = "none";
            }
            window_MaxButton.setAttribute("title", "Restore Down");
        });
        currentWindow.on('unmaximize', () => {
            isFalseAlarm = true;
            showCover();
            document.documentElement.setAttribute("window-is-minimized", "");
            isMax = false;
            if (!osInfo.isMacOS) {
                window_MaxButton_MaxIcon.style.display = "none";
                window_MaxButton_UnmaxIcon.style.display = "inline-block";
            }
            window_MaxButton.setAttribute("title", "Maximize");
        });
        if (!currentWindow.isMaximized()) {
            document.documentElement.setAttribute("window-is-minimized", "");
            window_MaxButton_MaxIcon.style.display = "none";
            window_MaxButton_UnmaxIcon.style.display = "inline-block";
        } else {
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
    closeWin_ = function() {
        if (!_shouldWait) {
            currentWindow.close();
        } else {
            _content.send("enderframework--willclose");
        }
        loop____ = setInterval(function() {
            if (!_shouldWait) {
                clearInterval(loop____);
                currentWindow.close();
            }
        }, 5);
    };
    minWin_ = function() {
        currentWindow.minimize();
    };
    maxWin_ = function() {
        showCover(false);
        setTimeout(function() {
            (isMax) ? (function() {
                currentWindow.unmaximize();
            })() : (function() {
                currentWindow.maximize();
            })();
        }, 50);
    };

    function init() {
        window_MinButton.addEventListener("click", minWin_, true);
        window_MaxButton.addEventListener("click", maxWin_, true);
        window_CloseButton.addEventListener("click", closeWin_, true);
        window_FullscreenButton.addEventListener("click", function() {
            _content.executeJavaScript("document.exitFullscreen();");
        }, true);
        Window_TopBar.style.display = "block";
    };
    document.onreadystatechange = function() {
        if (document.readyState == "complete") {
            init();
        }
    };
})();