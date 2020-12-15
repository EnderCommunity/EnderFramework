_content.addEventListener('ipc-message', event => {
    var isLocked = false;
    if (event.channel == "event--loadStyle") {
        if (manifest.content.customStyle) {
            _content.insertCSS(resources.css.main, { cssOrigin: 'author' });
            _content.insertCSS(resources.css.font, { cssOrigin: 'author' });
            _content.insertCSS(resources.css.icons, { cssOrigin: 'author' });
            _content.insertCSS(resources.css.animations, { cssOrigin: 'author' });
        }
    } else if (event.channel == "environment--tell-done") {
        finishedInsertingResources();
    } else if (event.channel == "event--startLoading") {
        var elem = document.getElementById("_longLoading");
        elem.style.display = "block";
    } else
    if (event.channel == "event--doneLoading") {
        var elem = document.getElementById("_longLoading");
        if (redirectAnimations_) {
            content.classList.remove("animated", "fadeInUp2", "fast-ish");
            setTimeout(function() {
                elem.style.display = "none";
                content.classList.add("animated", "fadeInUp2", "fast-ish");
                setTimeout(function() {
                    content.classList.remove("animated", "fadeInUp2", "fast-ish");
                }, 250);
            }, 400);
        } else {
            setTimeout(function() {
                elem.style.display = "none";
            }, 250);
        }
    } else if (event.channel == "customelements--insertcss") {
        _content.insertCSS(event.args[0]);
    } else if (event.channel == "get--codebox") {
        //
    } else if (event.channel == "get--customelements") {
        content.executeJavaScript(CustomElementsScript);
    } else if (event.channel == "get--scrollAnimation") {
        content.executeJavaScript(OnScrollAnimation);
    } else if (event.channel == "get--tooltip") {
        content.executeJavaScript(ToolTip);
    } else if (event.channel == "get--media") {
        content.executeJavaScript(Media);
    } else if (event.channel == "enderframework--windowcover-hide") {
        window.cover.hide();
        _content.executeJavaScript(`ENDERFRAMEWORK_ENVIRONMENT.EventReceiver("cover-status-changed", true);`)
    } else if (event.channel == "enderframework--windowcover-show") {
        window.cover.show();
        _content.executeJavaScript(`ENDERFRAMEWORK_ENVIRONMENT.EventReceiver("cover-status-changed", false);`)
    } else if (event.channel == "enderframework--dialogs-messagebox") {
        event.args = event.args[0];
        showMessageBox_(event.args[0], event.args[1], event.args[2], event.args[3]);
    } else if (event.channel == "enderframework--dialogs-close") {
        var alerts = document.getElementsByClassName("COfAlert");
        for (var i = 0; i < alerts.length; i++) {
            alerts[i].outerHTML = "";
        }
    } else if (event.channel == "enderframework--lockmode-enter") {
        lockCurrentWindow();
    } else if (event.channel == "enderframework--lockmode-leave") {
        unlockCurrentWindow();
    } else if (event.channel == "enderframework--theme-changetolight") {
        stopThemeAutoChange = true;
        document.documentElement.setAttribute("prefers-color-scheme", "light");
        changeIcons(true);
    } else if (event.channel == "enderframework--theme-changetodark") {
        stopThemeAutoChange = true;
        document.documentElement.setAttribute("prefers-color-scheme", "dark");
        changeIcons(false);
    } else if (event.channel == "enderframework--theme-changeunlock") {
        stopThemeAutoChange = false;
    } else if (event.channel == "enderframework--share-show") {
        showShareScreen(event.args[0][0]);
    } else if (event.channel == "enderframework--notification-show") {
        var id = event.args[0][0],
            title = event.args[0][1],
            message = event.args[0][2],
            icon = event.args[0][3];
        notify_1(title, message, icon, function(error, action) {
            if (error) {
                content.send("enderframework--notification-e" + id);
            } else {
                if (action == "dismissed") {
                    content.send("enderframework--notification-d" + id);
                } else if (action == "click") {
                    content.send("enderframework--notification-c" + id);
                } else if (action == "timeout") {
                    content.send("enderframework--notification-t" + id);
                } else {
                    content.send("enderframework--notification-u" + id);
                }
            }
        });
    } else if (event.channel == "enderframework--contextmenu-create") {
        var id = event.args[0][0],
            c = event.args[0][1];
        if (!checkContextMenuID(id)) {
            saveContextMenu(id, c);
            content.send("enderframework--contextmenu-createdone");
        } else {
            content.send("enderframework--contextmenu-createfailed");
        }
    } else if (event.channel == "enderframework--contextmenu-show") {
        //console.log(event.args[0][0]);
        //console.log(event.args[0][1]);
        //event.args[0][1].top += content.offsetTop;
        var c = event.args[0][1];
        c.top += content.offsetTop;
        showAContextMenu(event.args[0][0], c);
    } else if (event.channel == "enderframework--floatingaction-click") {
        //document.getElementById("_cover").style.display = "block";
        //
        event.args = event.args[0];
        const CEID = event.args[0],
            executeDOMJS = function(code) {
                content.executeJavaScript(code.replace(/{currentFloatingAction}/g, `ENDERFRAMEWORK_ENVIRONMENT.elements.floatingActionButton[${CEID}]`));
            };
        ShowFloatingActionContent(executeDOMJS, event.args[1]);
        //
    } else if (event.channel == "enderframework--topbar-autoblur") {
        Window_TopBar.classList.add("loaded");
        autoHideIsOn = true;
        lockTopBarBlur = false;
    } else if (event.channel == "enderframework--topbar-blur") {
        Window_TopBar.classList.add("loaded");
        lockTopBarBlur = true;
    } else if (event.channel == "enderframework--topbar-unblur") {
        Window_TopBar.classList.remove("loaded");
        lockTopBarBlur = true;
    } else if (event.channel == "enderframework--theme-coverpage") {
        document.getElementById("_cover").style.display = "block";
    } else if (event.channel == "enderframework--dialog-infoscreen") {
        document.getElementById("_icon").click();
    } else if (event.channel == "enderframework--contextmenu-remove") {
        //
    } else if (event.channel == "enderframework--contextmenu-hideall") {
        document.removeContextMenus();
    } else if (event.channel == "enderframework--waitbeforeclosing") {
        _shouldWait = true;
    } else if (event.channel == "enderframework--waitbeforeclosing-done") {
        if (!isLocked) {
            _shouldWait = false;
        }
        isLocked = true;
    } else if (event.channel == "enderframework--waitbeforeclosing-done2") {
        if (!isLocked) {
            if (loop____ !== null) {
                clearInterval(loop____);
            }
            _shouldWait = false;
        }
        isLocked = false;
    } else if (event.channel == "enderframework--close") {
        window.close();
    } else if (event.channel == "enderframework--new") {
        window.open("_window.html");
    } else if (event.channel == "enderframework--new2") {
        try {
            //var _window = window.open("_subwindow.html");
            //windowNum++;
            //console.log(event);
            event.args = event.args[0];
            var url = window.location + "?subwindow=" + event.args.id,
                _window = window.open(url);
            windowsArray[event.args.id] = _window;
            //console.log(url);
            //console.log(event.args.id);
            //window.location.search.indexOf("?subwindow") == 0
            //console.log(event.args.data[0]);
            var loop_ = 0,
                loop = setInterval(function() {
                    _window.postMessage({
                        url: event.args.data[0],
                        width: event.args.data[1],
                        height: event.args.data[2],
                        title: event.args.data[3],
                        minWidth: event.args.data[4],
                        minHeight: event.args.data[5],
                        maxWidth: event.args.data[6],
                        maxHeight: event.args.data[7],
                        menu: event.args.data[8]
                    }, url);
                    if (loop_ == 6) {
                        clearInterval(loop);
                    }
                    loop_++;
                }, 100);
        } catch {
            //
        }
    } else if (event.channel == "enderframework--subwindow-sendmessage") {
        event.args = event.args[0];
        windowsArray[event.args.id].postMessage({
            channel: event.args.channel,
            data: event.args.data
        });
    } else if (event.channel == "enderframework--topbar-settononedrag") {
        document.getElementById("_topBar").classList.add("noneDrag");
        win.hide();
        win.show();
    } else if (event.channel == "enderframework--windowblur-setcolor") {
        event.args = event.args[0];
        var style = document.getElementById("_acrylicColors");
        if (event.args == null) {
            style.innerHTML = "";
        } else {
            if (manifest.window.type == "acrylic")
                style.innerHTML = `[window-type="acrylic"], [prefers-color-scheme="dark"][window-type="acrylic"]{ --WindowBackgroundColor: #${event.args}33; --WindowBorderColor: #${event.args}; } [window-type="acrylic"][window-is-blurred], [prefers-color-scheme="dark"][window-type="acrylic"][window-is-blurred]{ --WindowBackgroundColor: #${event.args}66; }`;
            else
                style.innerHTML = `:root, [prefers-color-scheme="light"], [prefers-color-scheme="dark"]{ --WindowBackgroundColor: #${event.args}; --TopBar-BackgroundColor: transparent; }`;
        }
    } else if (event.channel == "enderframework--topbar-settodrag") {
        document.getElementById("_topBar").classList.remove("noneDrag");
        win.hide();
        win.show();
    } else if (event.channel == "enderframework--topbar-setoverlay") {
        document.getElementById("_topBar").classList.add("isOverlay");
        content.classList.add("isOverlay");
    } else if (event.channel == "enderframework--topbar-removeoverlay") {
        document.getElementById("_topBar").classList.remove("isOverlay");
        content.classList.remove("isOverlay");
    } else if (event.channel == "enderframework--menu-color") {
        if (customTopBarColorDone == false)
            customTopBarColor = event.args;
        else
            document.getElementById("_topBar").style.background = event.args;
    } else if (event.channel == "enderframework--title-show") {
        document.getElementById("_title").style.display = "inline-block";
    } else if (event.channel == "enderframework--icon-hide") {
        if (!isSub) {
            didHideIcon = true;
            document.getElementById("_icon").style.display = "none";
            //document.getElementById("_title").style.marginLeft = "8px";
        }
    } else if (event.channel == "enderframework--icon-show") {
        if (!isSub) {
            didHideIcon = false;
            document.getElementById("_icon").style.display = "inline-block";
            //document.getElementById("_title").style.marginLeft = "0px";
        }
    } else if (event.channel == "enderframework--title-hide") {
        if (!isSub)
            document.getElementById("_title").style.display = "none";
    } else if (event.channel == "enderframework--title-set") {
        if (!isSub) {
            document.getElementById("_title").innerHTML = event.args;
            document.getElementsByTagName("title")[0].innerHTML = event.args;
        }
    } else if (event.channel == "enderframework--menu-hide") {
        if (_menuContent.type == "menu") {
            document.getElementById("_menu2").style.display = "none";
            document.getElementById("_title").style.display = "inline-block";
        } else if (_menuContent.type == "side") {
            document.getElementById("_sideMenu").style.display = "none";
            document.getElementById("__sideMenu").style.display = "none";
            document.getElementById("_sideMenuBorder").style.display = "none";
            document.getElementById("_topBar").classList.remove("withSideMenu");
            document.getElementById("_contentView").classList.remove("withSideMenu");
        } else if (_menuContent.type == "top") {
            document.getElementById("_topMenu").style.display = "none";
            document.getElementById("_topMenuBorder").style.display = "none";
            document.getElementById("_topBar").classList.remove("withTopMenu");
            document.getElementById("_contentView").classList.remove("withTopMenu");
        }
    } else if (event.channel == "enderframework--menu-show") {
        if (_menuContent.type == "menu") {
            document.getElementById("_menu2").style.display = "inline-block";
            if (!isSub)
                document.getElementById("_title").style.display = "none";
        } else if (_menuContent.type == "side") {
            document.getElementById("_sideMenu").style.display = "block";
            document.getElementById("__sideMenu").style.display = "block";
            document.getElementById("_sideMenuBorder").style.display = "block";
            document.getElementById("_topBar").classList.add("withSideMenu");
            document.getElementById("_contentView").classList.add("withSideMenu");
        } else if (_menuContent.type == "top") {
            document.getElementById("_topMenu").style.display = "block";
            document.getElementById("_topMenuBorder").style.display = "block";
            document.getElementById("_topBar").classList.add("withTopMenu");
            document.getElementById("_contentView").classList.add("withTopMenu");
        }
    } else if (event.channel == "enderframework--openinbrowser") {
        var opn_ = require('opn');
        event.args = event.args[0];
        if (event.args.browser == "default")
            opn_(event.args.url);
        else
            opn_(event.args.url, { app: event.args.browser });
    } else if (event.channel == "enderframework--relaunch") {
        electron.remote.app.relaunch();
        electron.remote.app.exit();
    } else if (event.channel == "enderframework--contextmenu-defaults") {
        if (contextMenu_) {
            event.args = event.args[0];
            var Top_ = event.args.Y,
                Left_ = event.args.X;
            if (_menuContent.type == "none") {
                Top_ += document.getElementById("_topBar").offsetHeight;
            }
            if (event.args.type == "input") {
                showContextMenu({
                    0: {
                        title: "Cut",
                        function: "ENDERFRAMEWORK_ENVIRONMENT.actions.Cut"
                    },
                    1: {
                        title: "Copy",
                        function: "ENDERFRAMEWORK_ENVIRONMENT.actions.Copy"
                    },
                    2: {
                        title: "Paste",
                        function: "ENDERFRAMEWORK_ENVIRONMENT.actions.Paste"
                    },
                    3: {
                        title: "Delete",
                        function: "ENDERFRAMEWORK_ENVIRONMENT.actions.Delete"
                    }
                }, {
                    left: Left_,
                    top: _changeContextMenuTopValue(Top_)
                });
            } else if (event.args.type == "password") {
                showContextMenu({
                    2: {
                        title: "Paste",
                        function: "ENDERFRAMEWORK_ENVIRONMENT.actions.Paste"
                    },
                    3: {
                        title: "Delete",
                        function: "ENDERFRAMEWORK_ENVIRONMENT.actions.Delete"
                    }
                }, {
                    left: Left_,
                    top: _changeContextMenuTopValue(Top_)
                });
            }
        }
    } else if (event.channel == "do--notify") {
        var notif = document.getElementById("_notification");
        notif.removeAttribute("show");
        setTimeout(function() {
            notif.getElementsByTagName("h4")[0].innerHTML = event.args;
            notif.removeAttribute("style");
            setTimeout(function() {
                if (notif.offsetWidth + 36 > window.innerWidth)
                    notif.setAttribute("style", "margin: 0px 18px;");
                notif.setAttribute("show", "");
            }, 60);
        }, 100);
        if (global.currentCountdown_notify != null)
            clearTimeout(currentCountdown_notify);
        global.currentCountdown_notify = setTimeout(function() {
            notif.removeAttribute("show");
        }, 5000);
    } else if (event.channel == "enderframework--feedback") {
        if (event.args[0]) {
            document.getElementById("_FeedbackBar").style.display = "block";
        } else {
            showFeedbackScreen();
        }
    } else if (event.channel == "enderframework--record-audio") {
        //event.target.send('enderframework--record-audioR', "content");
        //content.send('enderframework--record-audioR', "content");
    } else if (event.channel == "do--openawebpage") {
        var webview = document.getElementById("_webBrowserWebview");
        webview.setAttribute("src", event.args);
        document.getElementById("_webBrowserC").style.display = "block";
    } else if (event.channel == "reportingsystem--window") {
        __reportErrorWindow(event.args[0], event.args[1], event.args[2], event.args[3], event.args[4]);
    } else if (event.channel == "reportingsystem--process") {
        __reportErrorProcess(event.args[0], event.args[1], event.args[2], event.args[3], event.args[4]);
    } else if (event.channel == "reportingsystem--api") {
        __reportErrorAPI(event.args[0], event.args[1], event.args[2], event.args[3], event.args[4]);
    }
});